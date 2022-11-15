import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';



export const config = {
  runtime: 'experimental-edge',
};

export default async function handler(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const img = searchParams.get('img');
  let name = searchParams.get('name');
  const sale_price = searchParams.get('sale_price');
  const discount = searchParams.get('discount');
  const category = searchParams.get('category');
  const categoryName = searchParams.get('category_name');

  name = (name ?? "").substring(
    0,
    Math.min((name ?? "").length, 15)
  );

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          fontSize: 60,
          color: 'black',
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          background: "white"
        }}
      >
        <img
          width="120"
          height="120"
          src={`https://sitemap-gen-stage-env.s3.eu-central-1.amazonaws.com/aslogo.png`}
          style={{
            marginTop: "50px",
            position: "absolute",
            top: -39,
            left: 9
          }}
        />

        <img width="72"
          height="72" style={{
            position: "absolute",
            marginTop: "50px",
            right: 9,
            top: -27,
            borderRadius: "50%"
          }} src={category ?? ""} alt="" />
        <p style={{ position: 'absolute', right: 9, top: 19, fontSize:18 }} >{categoryName}</p>

        <p style={{ position: 'absolute', right: 310, top: 69 }} >Save {discount}</p>

        <img
          width="500"
          height="500"
          src={img ?? ""}
          style={{
            position: "absolute",
            marginTop: 210,
            marginLeft: 180
          }}
        />
        <div style={{ display: "flex", position: "absolute", marginTop: 300, justifyContent: "center", width: "100%", fontSize: "36px", marginLeft:"200px" }} >
          <p>{name}</p>
        </div>
        <div style={{
          backgroundColor: "#ffc83d",
          position: "absolute",
          marginTop: 500,
          right: 390,
          display: "flex",
          height: 72,
          fontSize: "20px",
          borderRadius: "4px",
          width: 240,
          justifyContent: "center"
        }} >
          <p>
            KES: {sale_price}

          </p>
        </div>
        <div style={{ display: "flex", position: "absolute", marginTop: 630 , justifyContent: "center", width: "100%", fontSize: "21px" }} >
          <p>www.africasokoni.co.ke</p>
        </div>
      </div>
    ),
    {
      width: 1440,
      height: 720,
    },
  );
}



