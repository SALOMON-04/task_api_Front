import Header from '../../components/hearder/header'
import Hero from '../../components/hero/hero'
import Footer from '../../components/footer/footer'



const Home = () => {
  return (
    <div className='flex min-h-screen flex-col bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white'>
      <Header />

      <main className='flex-1'>
        <Hero />
      </main>

      <Footer />
    </div>
  )
}

export default Home