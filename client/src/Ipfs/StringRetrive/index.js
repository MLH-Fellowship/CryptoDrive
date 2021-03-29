import IPFS from "ipfs-api";

const ipfs = new IPFS({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

const StringRetrive = (hash) => {
  const data = ipfs.get(hash);
  const content = data[0].content;
  const retrived_string = content.toString("utf8");
  console.log(retrived_string);
  return retrived_string;
};

export default StringRetrive;
