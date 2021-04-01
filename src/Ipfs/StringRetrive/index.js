import ipfs from "../ipfs";
const StringRetrive = async (hash) => {
  const data = await ipfs.get(hash);
  const content = data[0].content;
  const retrived_string = content.toString("utf8");
  console.log(retrived_string);
  return retrived_string;
};

export default StringRetrive;
