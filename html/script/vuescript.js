new Vue({
  el: "#app",
  data: {
    toggleView: true,
    stampEditMode: false,
    facingValue: "environment",
    selectedModel: "",
    selectedFont: "",
    selectedBlendedShape:"",
    BlendedShapeValue:"",
    Text: "",
    stampImg: []
  },
  methods: {
    grabImage: function() {
      var canvas = document.querySelector("#stampCanvas_lower");
      var stampBG = document.querySelector("#stampCanvas_upper");
      var context = canvas.getContext("2d");
      context.drawImage(stampBG, 0, 0, 400, 400);
      this.stampImg.push(canvas.toDataURL().split("base64,")[1]);

      var zip = new JSZip();
      for (let i = 0; i < this.stampImg.length; i++)
        zip.file("img" + [i] + ".png", this.stampImg[i], { base64: true });

      let link = document.getElementById("dllink");
      zip.generateAsync({ type: "blob" }).then(function(content) {
        saveAs(content, "stamp.zip");
      });
    },
    activateCamera: function() {
      this.toggleView = !this.toggleView;
      if (this.toggleView != true) this.initCamera();

      // edit Hinoto
      if (this.toggleView != false) upserver();
    },
    initCamera: function() {
      var video = document.getElementById("cam_preview");

      /*camera settings*/

      var constraints = {
        audio: false,
        video: {
          facingMode: this.facingValue
        }
      };

      /*sync camera to <video> tag */
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
          video.srcObject = stream;
          localMediaStream = stream;
        })
        .catch(err => {
          console.log(err.name + ":" + err.message);
        });
    },
    toggleCamera: function() {
      if (this.facingValue === "environment") {
        this.facingValue = "user";
        this.initCamera();
      } else if (this.facingValue === "user") {
        this.facingValue = "environment";
        this.initCamera();
      }
      console.log(this.facingValue);
    },
    toggleStampEditMode: function() {
      var modelPrevData = document.querySelector("#model_preview");
      var stampBackground = document.querySelector("#modelBackground");
      var stampBG = document.querySelector("#stampCanvas_lower");

      //   var context = modelPrevData.getContext("2d");
      var context = modelPrevData.getContext("webgl"); //モデルを表示している部分はwebglコンテキスト（泣き）
      console.log(context);
      
      stampBackground.getContext("2d").drawImage(modelPrevData,0,0,400,400);
      stampBG.getContext("2d").drawImage(stampBackground, 0, 0, 400, 400);

      this.$nextTick(() => initStampCanvas()); //DOMレンダリングが更新されたタイミングで呼び出されるコールバック関数
      this.stampEditMode = true;
    },
    changeModel: function() {
      currentModel = "assetts/" + this.selectedModel;
      reloadModel();
    },
    changeBlendedShape:function(){
      setBlendedShape(this.selectedBlendedShape,this.BlendedShapeValue);
    },
    nextStamp: function() {
      // this.toggleView = !this.toggleView;
      this.stampEditMode = !this.stampEditMode;
      // copy current canvas function insert here //
      var canvas = document.querySelector("#stampCanvas_lower");
      var stampBG = document.querySelector("#stampCanvas_upper");
      var BackgroundCanvas = document.querySelector("#modelBackground");
      BackgroundCanvas.getContext("2d").clearRect(0,0,BackgroundCanvas.width,BackgroundCanvas.height);
      var context = canvas.getContext("2d");
      context.drawImage(stampBG, 0, 0, 400, 400);

      this.stampImg.push(canvas.toDataURL().split("base64,")[1]);
      context.clearRect(0,0,canvas.width,canvas.height);
      stampBG.getContext("2d").clearRect(0,0,stampBG.width,stampBG.height);
      clearCanvas();
    },
    changeBackgroundColor:function(color){
      var canvas = document.querySelector("#modelBackground");
      var context = canvas.getContext("2d");
      if(color != null){
        context.fillStyle = color;
        context.fillRect(0,0,400,400);
      }
      else{
        context.clearRect(0,0,canvas.width,canvas.height);
      }

    },
    changeTextColor: function(str) {
      updateText(str, "text_color");
    },
    changeBorderWidth: function(val) {
      updateText(val, "border_weight");
    },
    changeFonts: function() {
      updateText(this.selectedFont, "font");
    },
    changeText: function() {
      updateText(this.Text, "text");
    },
    writeDownToLowerCanvas: function() {
      discardSelection();
      var canvas = document.querySelector("#stampCanvas_lower");
      var stampBG = document.querySelector("#stampCanvas_upper");
      var context = canvas.getContext("2d");
      context.drawImage(stampBG, 0, 0, 400, 400);
    }
  }
});
