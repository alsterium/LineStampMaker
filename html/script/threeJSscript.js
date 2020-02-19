/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style

// three.jsで使う各オブジェクトの宣言
var renderer, scene, camera, light, controls;
var currentModel = "assetts/MikuMiku.vrm";

// CHANGED: ポーズ変換に必要な変数とか
var init_pose = undefined;
var changeFlag = false;
var currentVrm = undefined;
const clock = new THREE.Clock();

// 入力するopenposeデータ
var openPoseDataArray = [
  [7.54516134791414, -21.768140173180647, -183.4596745057812],
  [-124.5336455982307, 2.415918621530429, -284.8569690566266],
  [-193.02280218024345, -134.14277584172567, -702.8368725045019],
  [-119.88440248193754, 9.72410772056005, -970.9002981473045],
  [154.8486118073826, -45.952199328402315, -334.57519674023166],
  [215.08971510235713, -174.52465049814086, -714.29186443519],
  [166.46238247650444, -23.654825428960223, -983.4563352068009],
  [3.4347934233028363, 63.754926563186196, 133.4556896348461],
  [4.0444335372624645, 92.51847278387943, 380.5741280391957],
  [-23.95490498313763, -6.959973842296878, 587.2537513546404],
  [-59.80226250940439, 52.05215416663249, 664.2835118003845],
  [195.78954304127942, 82.72433860524372, 345.4867843416409],
  [436.04629683883314, 101.85369806885731, 157.6088322373995],
  [467.13680014680523, -35.958118637279526, -188.32700894361506],
  [-182.2795224752419, 127.74897641993233, 369.8786700504398],
  [-398.79876732551367, 27.03427199859532, 338.61811621791105],
  [-514.5184003971674, -116.86618120857737, 524.1660520795907]
];

var openPoseDataArray2 = [
  [15.257944842269263, 15.982052800725015, -114.7533608385852],
  [-40.53693109191771, 131.46496955243475, -93.32244593616981],
  [-186.60580867084593, 60.48627460890827, -524.9655508389833],
  [-18.8528097058963, 143.63230324356167, -929.2343078416505],
  [84.35277259213147, -99.50075784653107, -94.47492225793796],
  [-40.89391455089092, -158.60976677697832, -537.8788162579491],
  [152.7930198304419, -65.54845948299379, -966.5844824343498],
  [43.1208019790524, 38.59047669993919, 133.25320398726575],
  [53.572430018015346, 22.98665744352858, 400.29696911279444],
  [-18.324548248840525, -19.919344429700466, 467.68456035434536],
  [41.962732978901606, 5.804056978945414, 541.3510213172691],
  [153.1815384289993, -79.80051794824307, 383.6469283895747],
  [257.38697472471296, -219.35877961789566, 220.00697868868636],
  [125.83162654528165, -238.85303159866535, 105.46572739213778],
  [-50.086656931811106, 145.77500633702502, 385.90083092248426],
  [-271.13481361110763, 216.3179079679857, 354.3412306140378],
  [-260.97016057530305, 86.94103728611846, 564.7902887366829]
];

// var openPoseDataArray = [
//    [16.942990600348004, 27.237315101216257, -120.63414675857358],
//   [-141.28992623872938, 93.1129485054226, -78.98357436024418],
//   [-165.37269985903, 12.191102502542709, -460.296935395832],
//   [-203.17000589200362, 68.51870864069713, -898.0332868150836],
//   [115.40659107509381, -38.63838070923106, -110.76344041106528],
//   [219.92095440471866, -102.11732854934385, -463.91847950118716],
//   [152.8754556198616, 5.412186472785836, -839.3902708369064],
//   [73.03577351320627, 69.42764905239619, 105.83798199243815],
//   [125.35875418778714, 66.76553325308033, 374.8780140003594],
//   [92.95546372670923, -1.6900499949202354, 438.7714845456694],
//   [233.2666976458326, 36.48331116547781, 489.7075700421364],
//   [285.0981882458091, -10.261037346883537, 305.9890312255594],
//   [205.1406741185738, -241.43874569816722, 97.41258350791966],
//   [-5.526480972049946, -339.23933112045955, 321.63803213965593],
//   [-28.959332921085046, 145.5880532903489, 404.5911634577667],
//   [-295.7516390423935, 159.74435996063414, 283.6248330039009],
//   [-496.9972304505803, -3.6740685907614936, 407.27992865689833]
// ]

// ページの読み込みを待ってthree.jsの各初期化を行う
window.onload = () => init();

//swap 関数
function swap(a, x, y) {
  a[x] = [a[y], (a[y] = a[x])][0];
  return a;
}

function setPoseFromQuarternion(QuatArray) {
  let Pose = {
    hips: {
      rotation: [0.0, 1.0, 0.0, 0.0]
    },
    rightUpperLeg: {
      rotation: [QuatArray[1].x, QuatArray[1].y, QuatArray[1].z, QuatArray[1].w]
    },
    rightLowerLeg: {
      rotation: [QuatArray[2].x, QuatArray[2].y, QuatArray[2].z, QuatArray[2].w]
    },
    leftUpperLeg: {
      rotation: [QuatArray[4].x, QuatArray[4].y, QuatArray[4].z, QuatArray[4].w]
    },
    leftLowerLeg: {
      rotation: [QuatArray[5].x, QuatArray[5].y, QuatArray[5].z, QuatArray[5].w]
    },
    spine: {
      rotation: [QuatArray[7].x, QuatArray[7].y, QuatArray[7].z, QuatArray[7].w]
    },
    neck: {
      rotation: [QuatArray[9].x, QuatArray[9].y, QuatArray[9].z, QuatArray[9].w]
    },
    leftUpperArm: {
      rotation: [
        QuatArray[11].x,
        QuatArray[11].y,
        QuatArray[11].z,
        QuatArray[11].w
      ]
    },
    leftLowerArm: {
      rotation: [
        QuatArray[12].x,
        QuatArray[12].y,
        QuatArray[12].z,
        QuatArray[12].w
      ]
    },
    rightUpperArm: {
      rotation: [
        QuatArray[14].x,
        QuatArray[14].y,
        QuatArray[14].z,
        QuatArray[14].w
      ]
    },
    rightLowerArm: {
      rotation: [
        QuatArray[15].x,
        QuatArray[15].y,
        QuatArray[15].z,
        QuatArray[15].w
      ]
    }
  };

  return Pose;
}

// 入力されたボーンの単位ベクトルを求める
function computeUnit(bonesArray) {
  // console.log(bonesArray);
  let NormVec = new Array();
  NormVec[0] = new THREE.Vector3(
    bonesArray[1][0] - bonesArray[0][0],
    bonesArray[1][1] - bonesArray[0][1],
    bonesArray[1][2] - bonesArray[0][2]
  ).normalize(); // rightUpperLeg
  NormVec[1] = new THREE.Vector3(
    bonesArray[2][0] - bonesArray[1][0],
    bonesArray[2][1] - bonesArray[1][1],
    bonesArray[2][2] - bonesArray[1][2]
  ).normalize(); // rightLowerLeg
  NormVec[2] = new THREE.Vector3(
    bonesArray[3][0] - bonesArray[2][0],
    bonesArray[3][1] - bonesArray[2][1],
    bonesArray[3][2] - bonesArray[2][2]
  ).normalize(); // rightFoot
  NormVec[3] = new THREE.Vector3(
    bonesArray[4][0] - bonesArray[0][0],
    bonesArray[4][1] - bonesArray[0][1],
    bonesArray[4][2] - bonesArray[0][2]
  ).normalize(); // leftUpperLeg
  NormVec[4] = new THREE.Vector3(
    bonesArray[5][0] - bonesArray[4][0],
    bonesArray[5][1] - bonesArray[4][1],
    bonesArray[5][2] - bonesArray[4][2]
  ).normalize(); // leftLowerLeg
  NormVec[5] = new THREE.Vector3(
    bonesArray[6][0] - bonesArray[5][0],
    bonesArray[6][1] - bonesArray[5][1],
    bonesArray[6][2] - bonesArray[5][2]
  ).normalize(); // leftFoot
  NormVec[6] = new THREE.Vector3(
    bonesArray[7][0] - bonesArray[0][0],
    bonesArray[7][1] - bonesArray[0][1],
    bonesArray[7][2] - bonesArray[0][2]
  ).normalize(); // spine
  NormVec[7] = new THREE.Vector3(
    bonesArray[8][0] - bonesArray[7][0],
    bonesArray[8][1] - bonesArray[7][1],
    bonesArray[8][2] - bonesArray[7][2]
  ).normalize(); // neck
  NormVec[8] = new THREE.Vector3(
    bonesArray[9][0] - bonesArray[8][0],
    bonesArray[9][1] - bonesArray[8][1],
    bonesArray[9][2] - bonesArray[8][2]
  ).normalize(); // jaw
  NormVec[9] = new THREE.Vector3(
    bonesArray[10][0] - bonesArray[8][0],
    bonesArray[10][1] - bonesArray[8][1],
    bonesArray[10][2] - bonesArray[8][2]
  ).normalize(); // head
  NormVec[10] = new THREE.Vector3(
    bonesArray[11][0] - bonesArray[8][0],
    bonesArray[11][1] - bonesArray[8][1],
    bonesArray[11][2] - bonesArray[8][2]
  ).normalize(); // leftUpperArm
  NormVec[11] = new THREE.Vector3(
    bonesArray[12][0] - bonesArray[11][0],
    bonesArray[12][1] - bonesArray[11][1],
    bonesArray[12][2] - bonesArray[11][2]
  ).normalize(); // leftLowerArm
  NormVec[12] = new THREE.Vector3(
    bonesArray[13][0] - bonesArray[12][0],
    bonesArray[13][1] - bonesArray[12][1],
    bonesArray[13][2] - bonesArray[12][2]
  ).normalize(); // leftHand
  NormVec[13] = new THREE.Vector3(
    bonesArray[14][0] - bonesArray[9][0],
    bonesArray[14][1] - bonesArray[9][1],
    bonesArray[14][2] - bonesArray[9][2]
  ).normalize(); // rightUpperArm
  NormVec[14] = new THREE.Vector3(
    bonesArray[15][0] - bonesArray[14][0],
    bonesArray[15][1] - bonesArray[14][1],
    bonesArray[15][2] - bonesArray[14][2]
  ).normalize(); // rightLowerArm
  NormVec[15] = new THREE.Vector3(
    bonesArray[16][0] - bonesArray[15][0],
    bonesArray[16][1] - bonesArray[15][1],
    bonesArray[16][2] - bonesArray[15][2]
  ).normalize(); // rightHand

  return NormVec;
}
//クォータニオンを求める
function calcquaternion(normvec, up) {
  var q = new THREE.Quaternion();
  return q.setFromUnitVectors(up, normvec);
}
//OpenPoseデータから回転制御形式のポーズデータを求める
function convertPose(OpenPoseData) {
  //ボーンノードごとの上方向ベクトルの設定
  let up = new Array();
  up[0] = new THREE.Vector3(0, 1, 0);
  up[1] = new THREE.Vector3(0, -1, 0);
  up[2] = new THREE.Vector3(0, -1, 0);
  up[3] = new THREE.Vector3(0, 1, 0);
  up[4] = new THREE.Vector3(0, -1, 0);
  up[5] = new THREE.Vector3(0, -1, 0);
  up[6] = new THREE.Vector3(0, 1, 0);
  up[7] = new THREE.Vector3(0, 1, 0);
  up[8] = new THREE.Vector3(0, 1, 0);
  up[9] = new THREE.Vector3(0, 1, 0);
  up[10] = new THREE.Vector3(-1, 0, 0);
  up[11] = new THREE.Vector3(-1, 0, 0);
  up[12] = new THREE.Vector3(-1, 0, 0);
  up[13] = new THREE.Vector3(1, 0, 0);
  up[14] = new THREE.Vector3(1, 0, 0);
  up[15] = new THREE.Vector3(1, 0, 0);

  //配列の要素をx,z,yからx,y,zに入れ替え
  for (i = 0; i < OpenPoseData.length; i++) swap(OpenPoseData[i], 1, 2);
  //左手系を右手系に変換
  for (i = 0; i < OpenPoseData.length; i++) OpenPoseData[i][0] *= -1;
  //単位ベクトルを算出
  let normVec = computeUnit(OpenPoseData);
  let quat = new THREE.Quaternion();
  //各ノードごとの回転角度（クォータニオン）を算出
  for (let i = 0; i < normVec.length; i++)
    quat[i] = calcquaternion(normVec[i], up[i]);
  //ポーズを返す
  return setPoseFromQuarternion(quat);
}

// CHANGED: Add function
function initializePose(vrm) {
  vrm.humanoid.setPose(init_pose);
}

function reloadModel(modelName) {
  renderer = null;
  scene = null;
  camera = null;
  light = null;
  controls = null;
  init_pose = undefined;
  changeFlag = false;
  currentVrm = undefined;
  init();
}

//VRMモデルをロードする
function loadVRM(Model) {
  let loader = new THREE.GLTFLoader();
  loader.crossOrigin = "anonymous";
  loader.load(
    Model,
    gltf => {
      THREE.VRM.from(gltf).then(vrm => {
        // CHANGED: ポーズ変換させるためにvrmを記憶
        currentVrm = vrm;
        scene.add(vrm.scene);
        // VRMモデルにPoseData(Json形式)のボーンデータを設定
        THREE.VRM.from(gltf).then(vrm => {
          // CHANGED: 初期ポーズ(T)を記憶しておく
          init_pose = vrm.humanoid.getPose();
          Object.keys(init_pose).forEach(key => {
            delete init_pose[key].position;
          });

          // let pose = convertPose(openPoseDataArray);
          // vrm.humanoid.setPose(pose);
        });
      });
    },
    progress =>
      console.log(
        "Loading moddel...",
        100 * (progress.loaded / progress.total),
        "%"
      ),
    error => console.error(error)
  );
}
//Three.jsの初期化関数
function init() {
  //create renderer
  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#model_preview"),
    preserveDrawingBuffer: true
  });

  // retina対応
  renderer.setPixelRatio(window.devicePixelRatio);
  let width = document.getElementById("model_preview").clientWidth;
  let height = document.getElementById("model_preview").clientHeight;
  renderer.setSize(width, height);

  //renderer.setPixelRatio(window.devicePixelRatio);
  //create scene
  scene = new THREE.Scene();

  //create cam
  camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 20.0);
  camera.position.set(0, 1, 5);

  //light
  light = new THREE.DirectionalLight(0xffffff);
  light.position.set(1.0, 1.0, 1.0).normalize();
  scene.add(light);

  //camera controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.screenSpacePanning = true;
  controls.target.set(0.0, 1.0, 0.0);
  controls.update();

  //VRMを読み込む
  loadVRM(currentModel);

  //helpers
  const gridHelper = new THREE.GridHelper(10, 10);
  scene.add(gridHelper);

  //軸を表示
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  animate();
}

//アニメーションを行う関数
function animate() {
  requestAnimationFrame(animate);
  render();

  // CHANGED: ポーズの動的な変換
  if (currentVrm && changeFlag) {
    // ポーズを初期化してからでないと
    // 変更後から変更するのでおかしくなる
    initializePose(currentVrm);
    const deltaTime = clock.getDelta();
    // pose変更の処理
    let pose = convertPose(openPoseDataArray);
    currentVrm.humanoid.setPose(pose);
    currentVrm.update(deltaTime);
    changeFlag = false;
  }
}

function render() {
  renderer.render(scene, camera);
}
