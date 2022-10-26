import { motion, AnimatePresence } from 'framer-motion'

import Layout from 'src/components/Layout'

import '../styles/globals.css'

const MyApp = ({ Component, pageProps, router }) => {
  return <Layout>
    <AnimatePresence>
      <motion.div
        key={router.route} initial="pageInitial" animate="pageAnimate" exit="pageExit"
        variants={{
          pageInitial: {
            opacity: 0
          },
          pageAnimate: {
            opacity: 1
          },
          pageExit: {
            opacity: 0
          }
        }}
      >
        <Component {...pageProps} />
      </motion.div>
    </AnimatePresence>
  </Layout>

}

export default MyApp
