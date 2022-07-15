import styles from "./../styles/Home.module.css";
import { loadStripe } from "@stripe/stripe-js";
import Head from "next/head";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

import { checkOutRequest } from "../pages/api/libs/checkOutRequest";
import Image from "next/image";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

function Product({
  title,
  uid,
  price,
  image,
  type,
  status,
  numberOfColours,
  ...props
}) {
  const cardWidth = {
    width: "18rem",
  };
  const buttonHeight = {
    height: "2.5rem",
  };

  const topMinHeight = {
    minHeight: "9.5rem",
  };

  return (
    <div className="card mx-3 my-3" style={cardWidth}>
      <Image
        loader={myLoader}
        src={image}
        alt={title}
        width={418}
        height={386}
        quality={50}
        layout="intrinsic"
      />
      <div className="card-body top" style={topMinHeight}>
        <p className="card-text text-info">{status}</p>
        <p></p>
        <h5 className="card-title">{title}</h5>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">{type}</li>
        <li className="list-group-item">
          {numberOfColours > 1
            ? `${numberOfColours} Colours`
            : `${numberOfColours} Colour`}
        </li>
        <li className="list-group-item">{`$${price}`}</li>
      </ul>
      <form
        className="d-flex justify-content-center"
        action="/api/products"
        method="POST"
      >
        <input type="hidden" name="key" value={uid} />
        <button
          style={buttonHeight}
          className="btn btn-primary my-3"
          type="submit"
        >
          Buy now
        </button>
      </form>
    </div>
  );
}

function IndexPage(props) {
  const featuredProducts = Object.values(props.products);

  const styleObj = {
    height: "calc(100vh - 5rem)",
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Striker - the best soccer shoes" />
        <meta name="keywords" content="Shoes, Soccer Shoes" />
        <title>Storefront</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossOrigin="anonymous"
        />
      </Head>
      <header className={styles.header}>
        <h1 className="h1 fw-bold my-3 text-center text-info">StoreFront</h1>
        <p className="h2 mb-3 text-center text-info">featured products</p>
      </header>
      <div className="container-fluid p-5" style={styleObj}>
        <div>
          <div
            id="shoe-cards"
            className="container d-flex flex-wrap justify-content-center"
          >
            {featuredProducts.map((product) => (
              <Product
                key={product.uid}
                {...product}
                checkOutRequest={checkOutRequest}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  // `getStaticProps` is executed on the server side.
  const res = fetch(
    "https://dmit2008-ed68c-default-rtdb.firebaseio.com/products.json"
  );
  const products = await (await res).json();

  return {
    props: {
      products,
      fallback: false,
    },
    revalidate: 60,
  };
}

export default IndexPage;
