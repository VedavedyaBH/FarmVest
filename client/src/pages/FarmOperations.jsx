import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import axios from "axios";
import { useState } from "react";

export function FarmOperations() {
  const [itemName, setItemName] = useState("");
  const [des, setDes] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const upload = async (e) => {
    e.preventDefault();

    const postData = new FormData();
    postData.append("itemname", itemName);
    postData.append("description", des);
    postData.append("price", price);
    postData.append("itemImage", image);

    try {
      const res = await axios.post("http://localhost:3000/farms", postData);

      if (res.status === 200) {
        alert("done");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("Bad Inputs");
      }
    }
  };

  const imageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="bg-white flex justify-center p-5 pt-32">
      <div className="p-6 border-2 shadow-sm">
        <div className="flex flex-col justify-center">
          <form onSubmit={upload}>
            <Heading label={"Upload Farm Data"}></Heading>
            <InputBox
              label={"Item Code"}
              placeholder={"Item Code"}
              onChange={(e) => setItemName(e.target.value)}
            />
            <InputBox
              label={"Description"}
              placeholder={"Description"}
              onChange={(e) => setDes(e.target.value)}
            />
            <InputBox
              label={"Price"}
              placeholder={"Price"}
              onChange={(e) => setPrice(e.target.value)}
            />
            <InputBox
              label={"Image"}
              type={"file"}
              placeholder={"Image"}
              onChange={imageUpload}
            />
            <div className="pt-4">
              <button type="submit">Upload</button>
              {/* <Button label={"Upload"} type={"submit"}></Button> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
