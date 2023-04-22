// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function completion(req, res) {
  if(req.method === "POST") {
    const { prompt = "" } = req.body;

    const data = "ReactJs is a UI Library";

    await new Promise((resolve) => setTimeout(resolve, 1000));

    res.status(200).json({result: data});
  } else {
    res.status(500).json({error: {message: "Not Found"}});
  }
}
