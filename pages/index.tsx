import type { NextPage } from 'next';
import { MainLayout } from '../components/layouts';
import { Typography } from '@mui/material'

const HomePage: NextPage = () => {
  return (
    <MainLayout>
      <Typography variant="h1" color='primary'>Hola prrrs</Typography>
    </MainLayout>
  )
}

export default HomePage;
