import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import uploadImages from "../components/Buttons/UploadImage";

export const pickImage = async () => {
  try {
    const resp = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    // console.log(resp.assets[0]);

    let name: any = resp.assets[0].uri.split("/").pop();
    let ext = resp.assets[0].uri.split(".").pop();
    const filePath = resp.assets[0].uri;
    const imageMime = `image/${ext}`;

    const uploadedData = await uploadImages(filePath, name, ext);
    // console.log(uploadedData);

    return uploadedData;
  } catch (err) {
    console.log(err);
  }
};

export const docPicker = async () => {
  try {
    const resp = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      type: "image",
    });
    let name: any = resp.assets[0].uri.split("/");
    name = name[name.length - 1];
    // console.log(resp.assets[0].base64);
    let ext = name.split(".").pop();

    const uploadedData = await uploadImages(
      resp.assets[0],
      name,
      `image/${ext}`
    );
    // console.log(uploadedData);

    return uploadedData;
  } catch (err) {}
};
