$(function(){ alert("jquery ok!"); 

  let clickedCount = 1; 

      let cart = []; 
      let totalSum = 0; 
   
      $(".order1").click(function(){
          document.getElementById("step1").style.display = "none";
          document.getElementById("step2").style.display = "none";
          document.getElementById("step3").style.display = "none";
          document.getElementById("step4").style.display = "block";
      });


  $(".goCart").click(function(){
    document.getElementById("step1").style.display = "none";
    document.getElementById("step2").style.display = "none";
    document.getElementById("step3").style.display = "block";
    document.getElementById("step4").style.display = "none";    
  });

  $(".gotoStep1").click(function(){
    document.getElementById("step1").style.display = "block";
    document.getElementById("step2").style.display = "none";
    document.getElementById("step3").style.display = "none";
    document.getElementById("step4").style.display = "none";    
  });

function newsList() {

  let imgSrc;
  let imgAlt;
  let imgPrice;

    fetch("https://openwater301.github.io/testSite/data/goods.json")
      .then((response) => response.json()) 
      .then((json) => {
        let { goods } = json; 
        alert(goods);
        alert(goods.length);

        let tableBody = []; 
        if(goods.length >0){
            for(var i=0; i<goods.length; i++){
                tableBody +=  "<tr>";
                tableBody +=  "<td>" + goods[i].title  + "</td>";
                tableBody +=  "<td><a href='#' class='goods" + i 
                               + "'><img src='" + goods[i].src + "' alt='"+ goods[i].title  
                               +"' title='" + goods[i].price  
                               + "' /></a></td>";
                tableBody +=  "<td>" + goods[i].price  + "</td>";
                 tableBody += "</tr>";  
            }

            $("#newsList").append(tableBody);
            $("#newsList tr").click(function(){
                imgSrc = $(this).find("img").attr("src");
               imgAlt = $(this).find("img").attr("alt");
               imgPrice = $(this).find("img").attr("title");

              $("#myfood").attr("src",imgSrc);
              $("#myfoodName").text(imgAlt);
              $("#myfoodPrice").text(imgPrice);

              $("#step1").css("display","none");
              $("#step2").css("display","block");

              if(imgAlt == "상품1"){
                $(".spec_is").html("<p>상품1은 ~~~~~~~~   </p>");
              }else if(imgAlt == "상품2"){
                $(".spec_is").html("<p>상품2은 ~~~~~~~~   </p>");
              }else if(imgAlt == "상품3"){
                $(".spec_is").html("<p>상품3은 ~~~~~~~~   </p>");
              }else if(imgAlt == "상품4"){
                $(".spec_is").html("<p>상품4은 ~~~~~~~~   </p>");
              }else if(imgAlt == "상품5"){
                $(".spec_is").html("<p>상품5은 ~~~~~~~~   </p>");
              }else if(imgAlt == "상품6"){
                $(".spec_is").html("<p>상품6은 ~~~~~~~~   </p>");
              }

            });

        }
        
        $(".plus").click(function(){ 
            clickedCount += 1; 
            if (clickedCount > 10) {
              alert("10개까지만 주문할 수 있습니다");
              clickedCount = 10;
            } else {
              $(".count").text(clickedCount);
            }
        });
        $(".minus").click(function(){ 
            clickedCount -= 1;  
            if (clickedCount < 1) {
              alert("1개이상 주문할 수 있습니다");
              clickedCount = 1;
            } else {
              $(".count").text(clickedCount);
            }          
        });

        $(".pushCart").click(function(){  alert("담기클릭");
        let goods1 = {
          name: imgAlt,
          price: imgPrice,
          src: imgSrc,
          count: clickedCount,
        }; 
        cart.push(goods1);

        let box = " ";
        for (var i in cart) {
          with (cart[i]) {
            box +=
              "상품명:" +
              name +
              "상품이미지:" +
              src +
              "가격:" +
              price +
              "수량:" +
              count +
              "\n";
          }
        }

        let num = cart.length - 1;        
        let shoppingCart_tbody = " ";
        if(cart.length >0){
            shoppingCart_tbody += "<tr><td>" +  (num +1)   + "</td>" ; 
            shoppingCart_tbody += "<td>" + "<p>" + cart[num].name    + "</p>"  
                                  +  "<p><img src='" + cart[num].src + "' width='50' height='50' alt='' /></p>"   + "</td>" ; 
            shoppingCart_tbody += "<td>" + cart[num].price + "</td>";
            shoppingCart_tbody += "<td>" + cart[num].count + "</td>";
            shoppingCart_tbody += "<td>" + cart[num].price * cart[num].count + "원</td>";
          $(".shoppingCart_tbody").append(shoppingCart_tbody) 
        }

        totalSum += cart[num].price * cart[num].count;
        alert("장바구니 총합계: " + totalSum);
        $(".total1").text(totalSum); 

        saveToLocal(goods1);
      });    

      function saveToLocal(todo) {
        let todos; 
        if (localStorage.getItem("todos") === null) {
          todos = []; 
        } else {
          todos = JSON.parse(localStorage.getItem("todos"));
        }
        todos.push(todo);
        localStorage.setItem("todos", JSON.stringify(todos));
      }
  
      getLocal1();
      function getLocal1(todo) {
        let todos; 
        if (localStorage.getItem("todos") === null) {
          todos = []; 
        } else {
          todos = JSON.parse(localStorage.getItem("todos"));
          cart = todos; 
        }
        todos.forEach(function (i) {
          let f = 0; 
          do {
            i.name = todos[f].name;
            i.src = todos[f].src;
            i.price = todos[f].price;
            i.count = todos[f].count;
            f++;

           let shoppingCart_tbody = " ";
           if(cart.length >0){
              shoppingCart_tbody += "<tr><td>" +  f  + "</td>" ; 
              shoppingCart_tbody += "<td>" + "<p>" +  i.name   + "</p>"  
                                    +  "<p><img src='" + i.src + "' width='50' height='50' alt='' /></p>"   + "</td>" ; 
              shoppingCart_tbody += "<td>" +  i.price   + "</td>";
              shoppingCart_tbody += "<td>" +  i.count   + "</td>";
              shoppingCart_tbody += "<td>" + i.price * i.count + "원</td>";
            $(".shoppingCart_tbody").append(shoppingCart_tbody) 
           }

            totalSum += i.price * i.count;
            $(".total1").text(totalSum); 
            $(".pay").text(totalSum);
          } while (f < todos.length + 1);
        });
      }

      });

}

      $(".delCart").click(function(){  
        if (cart.length >= 1) {
          let cleanCart = confirm("장바구니상품들을 삭제하겠습니까?");
          if (cleanCart == 1) {
            $(".shoppingCart_tbody").text(" ");     
            totalSum = 0;
            $(".total1").text(totalSum);
            $(".pay").text(totalSum);
            cart = [];
            alert("삭제후 cart.length: " + cart.length);
            localStorage.setItem("todos", JSON.stringify(cart)); //
            alert("로컬todos.length: " + todos.length);
          } else {
            alert("취소했습니다");
          }
        } else {
          alert("담아놓은상품이 없습니다");
        }     
      });

  newsList();
});