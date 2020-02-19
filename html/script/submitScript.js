// フォームでファイルを送信するための関数
function sendFile(){
    var formdata = new FormData(document.getElementById("my_form"));
    var xhttpreq = new XMLHttpRequest();
    xhttpreq.onreadystatechange = function(){
        if(xhttpreq.readyState == 4 && xhttpreq.status == 200){
            console.log(JSON.parse(xhttpreq.responseText));
            openPoseDataArray = JSON.parse(xhttpreq.responseText);
            changeFlag = true;
        }
    }
    //xhttpreq.open("POST", "https://localhost:8888/post", true);
    xhttpreq.open("POST", "../post", true);
    xhttpreq.send(formdata);
}

function sendblob(blob) {//formDataにbase64をappendしてAjaxで送信
    //var hosturl = 'http://localhost:8080/upload';
    var hosturl = '../upload';
    //var hosturl = "https://192.168.11.2:8888/upload";
    var formData = new FormData();
    formData.append('blob', blob);
    console.log(formData);

    //console.log(formData.get('blob'));

    $.ajax({
        type: 'POST',
        url: hosturl,
        data: formData,
        contentType: false,
        processData: false,
        'async': true,
        success: function(data, textStatus){
            console.log(textStatus);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){

          console.log("XMLHttpRequest : " + XMLHttpRequest.status);
          console.log("textStatus     : " + textStatus);
          console.log("errorThrown    : " + errorThrown.message);
        }
    });
}

function upserver() {//ボタンクリックで呼び出される関数
  console.log("upserver is called");
  var video = document.getElementById("cam_preview");

  var canvas = document.getElementById('imageSaveCanvas');
  //canvasの描画モードを2sに
  var ctx = canvas.getContext('2d');

  //videoの縦幅横幅を取得
  var w = video.offsetWidth;
  var h = video.offsetHeight;

  //同じサイズをcanvasに指定
  canvas.setAttribute("width", w);
  canvas.setAttribute("height", h);

  //canvasにコピー
  ctx.drawImage(video, 0, 0, w, h);

  //imgにpng形式で書き出し
  //img.src = canvas.toDataURL('image/jpeg');

  // base64エンコードされたデータを取得 「data:image/png;base64,iVBORw0k～」
  //var base64 = img.src;

  //sendblob(base64);
  //console.log(canvas.toDataURL());
  //sendblob(canvas.toDataURL("image/jpeg"));
  sendImageByAxios(canvas.toDataURL("image/jpeg"));

  //画像がページ上に表示されないようにする
  document.getElementById("imageSaveCanvas").style.display="none";
  //document.getElementById("img").style.display="none";
}

function sendImageByAxios(base64){
    axios.post("/upload",{
        pad:base64
    })
    .then(function(response){
        //console.log(JSON.parse(response));
        console.log(response.data);
        //openPoseDataArray = JSON.parse(response);
        openPoseDataArray = response.data;
        changeFlag = true;
    })
    .catch(function(err){
        console.log(err);
    })
}