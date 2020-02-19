var stampCanvas;

function initStampCanvas() {
  //Canvasの初期化
  stampCanvas = new fabric.Canvas("stampCanvas_upper");
  var fontStyle = {
    font: "Nico Moji",
    size: 100,
    originX: "center",
    originY: "center",
    text: "おいっす"
  };
  var textGroup = create_bag_character(fontStyle);
  stampCanvas.add(textGroup);
}
//テキストの更新
function updateText(str, option) {
  if (option === "text_color") {
    stampCanvas.getActiveObject()._objects[2].setColor(str);
    stampCanvas.getActiveObject()._objects[0].set("stroke",str);
  }
  if(option === "border_weight"){
    stampCanvas.getActiveObject()._objects[0].set("strokeWidth",str);
  }
  if(option === "font"){
    stampCanvas.getActiveObject()._objects.forEach((value,index)=>{value.set("fontFamily",str)});
  }
  if(option === "text"){
    stampCanvas.getActiveObject()._objects.forEach((value,index)=>{value.set("text",str)});
  }

  // stampCanvas.clear();
  stampCanvas.requestRenderAll();
}

function create_bag_character(font_style) {
  //袋文字を作るためのテキスト
  var upperText = new fabric.Text(font_style.text, {
    fontFamily: font_style.font,
    fontSize: font_style.size,
    originX: font_style.originX,
    originY: font_style.originY
  });
  var middleText = new fabric.Text(font_style.text, {
    fontFamily: font_style.font,
    fontSize: font_style.size,
    stroke: "#ffffff",
    strokeWidth: 10,
    originX: font_style.originX,
    originY: font_style.originY
  });
  var lowerText = new fabric.Text(font_style.text, {
    fontFamily: font_style.font,
    fontSize: font_style.size,
    stroke: "#000",
    strokeWidth: 15,
    originX: font_style.originX,
    originY: font_style.originY
  });

  //二重袋文字
  var textGroup = new fabric.Group([lowerText, middleText, upperText], {
    top: 150,
    left: 150
  });
  return textGroup;
}

function discardSelection(){
  stampCanvas.discardActiveObject();
  console.log(stampCanvas._activeObject);
  stampCanvas.requestRenderAll()
}
