import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Facebook, LinkedIn, Twitter } from '@mui/icons-material'
import { BRAND_NAME } from '../helpers/configuration'

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
      {'Copyright © '}
      <Typography color="text.secondary" component="span">
        {BRAND_NAME}
      </Typography>
      &nbsp;
      {new Date().getFullYear()}
    </Typography>
  )
}

export function Footer() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          width: '100%',
          justifyContent: 'space-between',
          borderTop: '1px solid',
          borderColor: 'divider',
          alignItems: 'center',
          gap: { xs: 4, sm: 8 },
          py: { xs: 2, sm: 4 },
          mt: { xs: 4, sm: 8 },
          textAlign: { sm: 'center', md: 'left' },
        }}
      >
        <div>
          <Link color="text.secondary" variant="body2" href="#">
            Privacy Policy
          </Link>
          <Typography sx={{ display: 'inline', mx: 0.5, opacity: 0.5 }}>
            &nbsp;•&nbsp;
          </Typography>
          <Link color="text.secondary" variant="body2" href="#">
            Terms of Service
          </Link>
          <Copyright />
        </div>
        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          sx={{ justifyContent: 'left', color: 'text.secondary' }}
        >
          <IconButton
            color="inherit"
            size="small"
            href="https://github.com/mui"
            aria-label="GitHub"
            sx={{ alignSelf: 'center' }}
          >
            <Facebook />
          </IconButton>
          <IconButton
            color="inherit"
            size="small"
            href="https://x.com/MaterialUI"
            aria-label="X"
            sx={{ alignSelf: 'center' }}
          >
            <Twitter />
          </IconButton>
          <IconButton
            color="inherit"
            size="small"
            href="https://www.linkedin.com/company/mui/"
            aria-label="LinkedIn"
            sx={{ alignSelf: 'center' }}
          >
            <LinkedIn />
          </IconButton>
        </Stack>
      </Box>
    </>
  )
}
