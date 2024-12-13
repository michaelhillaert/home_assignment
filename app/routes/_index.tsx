import { MetaFunction } from '@vercel/remix'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import { Typography } from '@mui/material'
import { BRAND_NAME } from '../helpers/configuration'

export const meta: MetaFunction = () => {
  return [
    { title: `${BRAND_NAME} | Home` },
    { name: 'description', content: `Welcome to ${BRAND_NAME}` },
  ]
}

export default function Index() {
  return (
    <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
      <Grid size={{ xs: 4, sm: 8, md: 12 }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            height: 400,
            borderRadius: 1,
            bgcolor: 'grey.200',
            '&:hover': {
              bgcolor: 'grey.400',
            },
          }}
        >
          <Typography variant="h4" component="span" color="textSecondary">
            Content 01
          </Typography>
        </Box>
      </Grid>
      <Grid size={{ xs: 4, sm: 4, md: 8 }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            height: 200,
            borderRadius: 1,
            bgcolor: 'grey.200',
            '&:hover': {
              bgcolor: 'grey.400',
            },
          }}
        >
          <Typography variant="h4" component="span" color="textSecondary">
            Content 02
          </Typography>
        </Box>
      </Grid>
      <Grid size={{ xs: 4, sm: 4, md: 4 }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            height: 200,
            borderRadius: 1,
            bgcolor: 'grey.200',
            '&:hover': {
              bgcolor: 'grey.400',
            },
          }}
        >
          <Typography variant="h4" component="span" color="textSecondary">
            Content 03
          </Typography>
        </Box>
      </Grid>
      <Grid size={{ xs: 4, sm: 8, md: 4 }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            height: 450,
            borderRadius: 1,
            bgcolor: 'grey.200',
            '&:hover': {
              bgcolor: 'grey.400',
            },
          }}
        >
          <Typography variant="h4" component="span" color="textSecondary">
            Content 04
          </Typography>
        </Box>
      </Grid>
      <Grid size={{ xs: 4, sm: 8, md: 4 }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            height: 450,
            borderRadius: 1,
            bgcolor: 'grey.200',
            '&:hover': {
              bgcolor: 'grey.400',
            },
          }}
        >
          <Typography variant="h4" component="span" color="textSecondary">
            Content 05
          </Typography>
        </Box>
      </Grid>
      <Grid size={{ xs: 4, sm: 8, md: 4 }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            height: 450,
            borderRadius: 1,
            bgcolor: 'grey.200',
            '&:hover': {
              bgcolor: 'grey.400',
            },
          }}
        >
          <Typography variant="h4" component="span" color="textSecondary">
            Content 06
          </Typography>
        </Box>
      </Grid>
    </Grid>
  )
}
