# LineStampMaker
## About
融合デザインプロジェクトC班にて制作したStampを作成するためのプログラムです。
バックエンドは[@keitahayasaka](https://github.com/keitahayasaka),[@hihicojisan](https://github.com/hihicojisan)が担当、フロントエンドは[@alsterium](https://github.com/alsterium),他1名が担当。モデルのデザイン、ポスターデザインその他1名担当。
ブラウザ側で撮影した画像をローカルサーバーにポストし、受け取った写真からポーズを推定して、3Dモデルに同じポーズをさせたものを文字で修飾してスタンプとして出力します。
## Demo
[Youtube](https://www.youtube.com/watch?v=ep9LUt3VmHU&feature=youtu.be)
## 例
![pic](https://cdn.discordapp.com/attachments/641101890951708674/680033738133995538/img0.png)
## openPose座標からVRMモデルにポーズをとらせる
バックエンドにopenPoseを使用している関係上、ポーズは座標になって返ってきますが、そのままではモデルにポーズをとらせることができません。そこで、各関節の座標点を用いて関節の角度を計算し、その角度をモデルのポーズとして扱っています。推定されたポーズのノード間の距離等を考慮しなくてもよいので、他のモデルでもすぐに利用できるのが利点です。
