const sanitaize = {
  encode : function (str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  },
  decode : function (str) {
    return str.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, '\'').replace(/&amp;/g, '&');
  }
};

const slide = () => {
  const slideAry = document.querySelectorAll(".slider_item");
  document.getElementById("slider").style.width = `${slideAry.length*(100)}vw`; 
  //インジゲーター追加
  slideAry.forEach((v, i) => {
    let li = document.createElement("li");
    li.id = "indicator_item_" + (i + 1);
    if(i === 0){
      li.classList.add('active');
      v.classList.add('active');
    }
    document.querySelector(".indicator").appendChild(li);
    //背景画像設定
    let img = `assets/img/${sanitaize.encode(v.dataset.slide)}`;
    v.style.backgroundImage =`url(${img})`;
  });
  //インジゲータークリック
  const indicatorAry = document.querySelectorAll(".indicator li");
  indicatorAry.forEach((v,i) =>{
    v.addEventListener("click", function () {
      console.log(v.id);
      indicatorAry.forEach((ele,j) =>{
        ele.classList.remove('active');
        slideAry[j].classList.remove('active');
      });
      v.classList.add('active');
      slideAry[i].classList.add('active');
      document.getElementById("slider").style.transform =`translateX(${i*(-100)}vw)`;
    });
    count = 0;
  });

  const prev = document.getElementById("slider_prev");
  const next = document.getElementById("slider_next");
  //前へ、次へクリック
  next.addEventListener("click", nextClick);
  prev.addEventListener("click", prevClick);

  function nextClick() {
    let activeNo = Number(document.querySelector(".indicator .active").id.replace('indicator_item_', ''));
    slideAry.forEach((ele,i) =>{
      ele.classList.remove('active');
      indicatorAry[i].classList.remove('active');
    });
    if(activeNo === slideAry.length){
      indicatorAry[0].classList.add('active');
      slideAry[0].classList.add('active');
      document.getElementById("slider").style.transform =`translateX(0vw)`;
    }else{
      indicatorAry[activeNo].classList.add('active');
      slideAry[activeNo].classList.add('active');
      document.getElementById("slider").style.transform =`translateX(${activeNo*(-100)}vw)`;
    }
    count = 0;
  }

    function prevClick() {
      let activeNo = Number(document.querySelector(".indicator .active").id.replace('indicator_item_', ''));
      console.log(slideAry.length-1);
      slideAry.forEach((ele,i) =>{
        ele.classList.remove('active');
        indicatorAry[i].classList.remove('active');
      });
      if(activeNo === 1){
        indicatorAry[slideAry.length-1].classList.add('active');
        slideAry[slideAry.length-1].classList.add('active');
        document.getElementById("slider").style.transform =`translateX(${(slideAry.length-1)*(-100)}vw)`;
      }else{
        indicatorAry[activeNo-2].classList.add('active');
        slideAry[activeNo-2].classList.add('active');
        document.getElementById("slider").style.transform =`translateX(${(activeNo-2)*(-100)}vw)`;
      }
      count = 0;
    }

  // 自動スライド
  var count = 0;

  setInterval(() => {
    if (count > 4) {
      count = 0;
      nextClick();
    }
    count++;
  }, 5000);  
};
//グローバルメニュー
const globalMenu = () =>{
  const button = document.querySelector(".sp_menu_button");
  const menu = document.querySelector(".sp_nav");
  const overlay = document.querySelector(".js-overlay");
  const list = document.querySelector(".sp_nav .menu_list");
  
  let isMenuOpen = false; // メニューの状態を表す変数
  
  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen; // メニューの状態を反転
  
    // メニューがオープンの場合
    if (isMenuOpen) {
      button.classList.add("is-active");
      menu.classList.add("is-active");
      overlay.classList.add("is-active");
      list.classList.add("is-active");
      button.setAttribute("aria-expanded", "true");
      button.setAttribute("aria-label", "メニューを閉じる");
      list.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
    // メニューがクローズの場合
    else {
      button.classList.remove("is-active");
      menu.classList.remove("is-active");
      overlay.classList.remove("is-active");
      list.classList.remove("is-active");
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "メニューを開く");
      list.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  };
  
  button.addEventListener("click", toggleMenu);
  list.querySelectorAll('a').forEach(v => {
    v.addEventListener("click", toggleMenu);
  });
  
  // エスケープキーでメニューが閉じるようにする
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isMenuOpen) {
      toggleMenu();
    }
  });



}

window.addEventListener("load", function () {
  globalMenu();
  if(this.document.getElementById('top')){
    slide();
  }
});
