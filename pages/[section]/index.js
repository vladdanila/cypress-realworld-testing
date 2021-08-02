import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import SectionHero from "../../components/SectionHero"
import SectionCard from "../../components/SectionCard"
import learnJson from "../../learn.json"

export default function SectionPage({ section, title, lessons }) {
  const router = useRouter()
  
  return (
    <Layout>
      <Head>
        <title>Testing Your First Application</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <SectionHero />
      
      <main>
        {lessons.map((lesson) => (
          <div key={lesson.slug}>
            <SectionCard lesson={ lesson } />
          </div>
        ))}
      </main>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const { title, children } = learnJson[params.section]
  return {
    props: { section: params.section, lessons: children, title },
  }
}

export async function getStaticPaths() {
  const sections = Object.keys(learnJson);
  const paths = sections.map((section) => {
    const {title, children} = learnJson[section];
    return { params: { section: section, lessons: children , title } };
  })

  return {
    paths,
    fallback: true,
  }
}