import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { TwitterIcon } from 'app/components/Icon'
import LanguageSwitch from 'app/components/LanguageSwitch'
import Typography from 'app/components/Typography'
import { useActiveWeb3React } from 'app/services/web3'
import React from 'react'

import Container from '../Container'

const Footer = () => {
  const { chainId } = useActiveWeb3React()
  const { i18n } = useLingui()

  return (
    <div className="z-10 w-full py-20 mt-20">
      <Container maxWidth="7xl" className="px-6 mx-auto">
        <div className="grid grid-cols-2 gap-10 pt-8 border-t md:grid-cols-3 lg:grid-cols-6 xs:px-6 border-dark-900">
          <div className="flex flex-col gap-3">
            <Typography variant="xs" className="text-low-emphesis">
              {i18n._(t`Our community is building a comprehensive decentralized trading platform for the future of finance. Join
              us!`)}
            </Typography>
            <div className="flex items-center gap-4">
              <a href="https://twitter.com/ironprojectorg" target="_blank" rel="noreferrer">
                <TwitterIcon width={16} className="text-low-emphesis" />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <LanguageSwitch />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Footer
