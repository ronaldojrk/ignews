import { GetStaticProps } from 'next';
import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';

import Styles from './home.module.scss';


//cliente -side 

// server-side 
//static site generetion


// post do blog 
// conteudo (ssg)
//comentarios(cliente-side)

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }

}
export default function Home({ product }: HomeProps) {






  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={Styles.contentContainer}>
        <section className={Styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            News about the <span>React</span> world.</h1>

          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>

          <SubscribeButton priceId={product.priceId} />

        </section>

        <img src="/images/avatar.svg" alt="girl coding" />


      </main>
    </>
  )
}


export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1IYWDkJX1otHhTsrPdBbMZL9')


  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product

    },
    revalidate: 60 * 60 * 24//24 hours
  }

}
