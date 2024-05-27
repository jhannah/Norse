import { GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { CategorySection } from '../components/categories';
import { TourProvider } from '@reactour/tour';
import { AppFooter } from '../components/app-footer';
import { DataProviders } from '../components/data-providers';
import { AppHeader } from '../components/app-header';
import { HeroSection } from '../components/home/hero-section';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import { useAppConfig } from '@/lib/hooks/use-app-config';
import {
  serverSideAppConfig,
  serverSideCategories,
  serverSideFavorites,
} from '@/lib/server/utils';

export async function getStaticProps(ctx: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideCategories()),
      ...(await serverSideAppConfig()),
      ...(await serverSideFavorites()),
      ...(await serverSideTranslations(ctx.locale as string, [
        'page-home',
        'common',
        'dynamic',
      ])),
    },
  };
}

export default function Home() {
  const { t } = useTranslation('page-home');
  const appConfig = useAppConfig();

  const metaTitle = t('meta_title') || t('meta_title', { ns: 'dynamic' });
  const metaDescription =
    t('meta_description') || t('meta_description', { ns: 'dynamic' });

  return (
    <TourProvider steps={[]} scrollSmooth>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />

        <meta property="og:title" content={metaTitle} />
        <meta property="og:image" content={appConfig.brand.openGraphUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={metaDescription} />
      </Head>
      <AppHeader />
      <HeroSection />
      <CategorySection />
      <AppFooter>
        <DataProviders />
      </AppFooter>
    </TourProvider>
  );
}
