$(function(){ alert("jquery ok!"); //jquery시작
  //코드~

  let clickedCount = 1; //초기값

      let cart = []; //장바구니
      let totalSum = 0; //장바구니에 담긴 모든합계
   
      $(".order1").click(function(){//주문하기 페이지보기
          document.getElementById("step1").style.display = "none";
          document.getElementById("step2").style.display = "none";
          document.getElementById("step3").style.display = "none";
          document.getElementById("step4").style.display = "block";
      });


  $(".goCart").click(function(){//step3가기
    document.getElementById("step1").style.display = "none";
    document.getElementById("step2").style.display = "none";
    document.getElementById("step3").style.display = "block";
    document.getElementById("step4").style.display = "none";    
  });

  $(".gotoStep1").click(function(){//step1가기
    document.getElementById("step1").style.display = "block";
    document.getElementById("step2").style.display = "none";
    document.getElementById("step3").style.display = "none";
    document.getElementById("step4").style.display = "none";    
  });

function newsList() {
  alert("newsList함수실행 ok");

  let imgSrc;//경로
  let imgAlt;//상품명
  let imgPrice;//가격

  //$("#newsList")
  //이부분에 json데이터가 보여지기전에 로딩이미지를 보여준다

 // setTimeout(() => {
    fetch("./data/goods.json")
      .then((response) => response.json()) //json을 객체로 변환
      .then((json) => {
        //객체로 출력
        let { goods } = json; //비구조화할당
        alert(goods);//object
        alert(goods.length);//6   goods배열에 담긴 객체6개확인 

        let tableBody = [];//초기화   
        if(goods.length >0){//goods에 1개이상 데이터가 있을경우  
            for(var i=0; i<goods.length; i++){//6번 반복
                tableBody +=  "<tr>";
                tableBody +=  "<td>" + goods[i].title  + "</td>";
                tableBody +=  "<td><a href='#' class='goods" + i 
                               + "'><img src='" + goods[i].src + "' alt='"+ goods[i].title  
                               +"' title='" + goods[i].price  
                               + "' /></a></td>";
                tableBody +=  "<td>" + goods[i].price  + "</td>";
                 tableBody += "</tr>";  
            }//for문 종료

            $("#newsList").append(tableBody);//table에 보내기 
            $("#newsList tr").click(function(){
                //alert("상품클릭ok");
               imgSrc = $(this).find("img").attr("src");//경로
               imgAlt = $(this).find("img").attr("alt");//상품명
               imgPrice = $(this).find("img").attr("title");//가격

              //alert(imgSrc+imgAlt+imgPrice);//클릭한상품의 정보확인 
              $("#myfood").attr("src",imgSrc);
              $("#myfoodName").text(imgAlt);
              $("#myfoodPrice").text(imgPrice);

              $("#step1").css("display","none");
              $("#step2").css("display","block");//상품스펙보기

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

        }//if문 종료
        
        //수량조정함수
        $(".plus").click(function(){  //더하기
            clickedCount += 1; //1더하기
            if (clickedCount > 10) {
              alert("10개까지만 주문할 수 있습니다");
              clickedCount = 10;//alert("더하기");
            } else {
              $(".count").text(clickedCount);
            }
        });
        $(".minus").click(function(){ //빼기
            clickedCount -= 1;   //1빼기
            if (clickedCount < 1) {
              alert("1개이상 주문할 수 있습니다");
              clickedCount = 1;//alert("빼기");
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
        alert(box);//테스트 

        let num = cart.length - 1;
        //cart = cart.length;
        alert("cart.length에서 1을뺀값: " + num);

        
        let shoppingCart_tbody = " ";//초기화
        if(cart.length >0){
          //for(var i=0 ; i<cart.length ; i++){//번호 상품이미지 상품명 가격 합계
            shoppingCart_tbody += "<tr><td>" +  (num +1)   + "</td>" ; 
            shoppingCart_tbody += "<td>" + "<p>" + cart[num].name    + "</p>"  
                                  +  "<p><img src='" + cart[num].src + "' width='50' height='50' alt='' /></p>"   + "</td>" ; 
            shoppingCart_tbody += "<td>" + cart[num].price + "</td>";
            shoppingCart_tbody += "<td>" + cart[num].count + "</td>";
            shoppingCart_tbody += "<td>" + cart[num].price * cart[num].count + "원</td>";
          //}
          $(".shoppingCart_tbody").append(shoppingCart_tbody) 
        }

        //합계가 들어갈영역--------------------
        totalSum += cart[num].price * cart[num].count;
        alert("장바구니 총합계: " + totalSum);
        $(".total1").text(totalSum); //장바구니 총합계표시

        //로컬스토리지에 저장
        saveToLocal(goods1); //로컬스토리지에 저장하는 함수실행
      });    //담기함수종료    

     //로컬스토리지에 저장
      function saveToLocal(todo) {
        let todos; //로컬스토리지에 객체를 담을 배열
        if (localStorage.getItem("todos") === null) {
          todos = []; //배열초기화
        } else {
          todos = JSON.parse(localStorage.getItem("todos"));
        }
        todos.push(todo);
        localStorage.setItem("todos", JSON.stringify(todos));
      }//로컬저장함수종료
  
      getLocal1();//로컬에 담긴데이터 가져오기 
      function getLocal1(todo) {
        let todos; //로컬스토리지에 객체를 담을 배열
        if (localStorage.getItem("todos") === null) {
          todos = []; //배열초기화
        } else {
          todos = JSON.parse(localStorage.getItem("todos"));
          cart = todos; //추가 9.20
        }
        todos.forEach(function (i) {
          let f = 0; //변수  상품을 담을때 객체1씩
          do {
            i.name = todos[f].name;
            i.src = todos[f].src;
            i.price = todos[f].price;
            i.count = todos[f].count;
            f++;

           let shoppingCart_tbody = " ";//초기화
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
            //alert("총합계: " + totalSum);
            $(".total1").text(totalSum); //장바구니 총합계표시
            $(".pay").text(totalSum);//주문시 총합계표시
          } while (f < todos.length + 1);
        });
      }//로컬저장함수종료

      });
 // }, 1500); //1.5초후에 json데이터보여지게 동작
}


      //삭제함수
      $(".delCart").click(function(){  alert("비우기 클릭");//
        if (cart.length >= 1) {
          //담아놓은상품이 1개이상 있을경우 삭제
          let cleanCart = confirm("장바구니상품들을 삭제하겠습니까?");
          if (cleanCart == 1) {
            $(".shoppingCart_tbody").text(" ");     
            totalSum = 0;
            $(".total1").text(totalSum); //표시  
            $(".pay").text(totalSum);//주문시 총합계표시
            cart = [];
            alert("삭제후 cart.length: " + cart.length);
            localStorage.setItem("todos", JSON.stringify(cart)); //
            alert("로컬todos.length: " + todos.length);
          } else {
            alert("취소했습니다");
          }
        } else {
          //담아놓은상품이 없을경우
          alert("담아놓은상품이 없습니다");
        }     
      });//비우기함수종료

  newsList();
});