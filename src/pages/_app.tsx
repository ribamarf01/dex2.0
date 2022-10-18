import { AnimatePresence, motion } from 'framer-motion'

import Layout from 'src/components/Layout'

import '../styles/globals.css'

const MyApp = ({ Component, pageProps, router }) => {
  return <Layout>
    
      <motion.div 
        key={router.route} initial="pageInitial" animate="pageAnimate" exit="pageExit"
        variants={{
          pageInitial: {
            opacity: 0
          },
          pageAnimate: {
            opacity: 1
          }
        }}
      >
        <Component {...pageProps} />
      </motion.div>
    
  </Layout>
  
}

export default MyApp
