import { BeakerIcon, SwitchVerticalIcon } from '@heroicons/react/outline'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { SUSHI_ADDRESS } from '@sushiswap/core-sdk'
import { Feature } from 'app/enums'
import { featureEnabled } from 'app/functions'
import { useActiveWeb3React } from 'app/services/web3'
import { ReactNode, useMemo } from 'react'

export interface MenuItemLeaf {
  key: string
  title: string
  link: string
  icon?: ReactNode
}

export interface MenuItemNode {
  key: string
  title: string
  items: MenuItemLeaf[]
  icon?: ReactNode
}

export type MenuItem = MenuItemLeaf | MenuItemNode
export type Menu = MenuItem[]

type UseMenu = () => Menu
const useMenu: UseMenu = () => {
  const { i18n } = useLingui()
  const { chainId, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!chainId) return []

    const menu: Menu = []

    const trade = [
      {
        key: 'swap',
        title: i18n._(t`Swap`),
        link: '/swap',
      },
      {
        key: 'limit',
        title: i18n._(t`Limit order`),
        link: '/limit-order',
        disabled: !featureEnabled(Feature.LIMIT_ORDERS, chainId),
      },
    ]

    const liquidity = [
      {
        key: 'pool',
        title: i18n._(t`Pool`),
        link: '/pool',
      },
      {
        key: 'add-liquidity',
        title: i18n._(t`Add`),
        link: `/add/ETH/${SUSHI_ADDRESS[chainId]}`,
      },

      // {
      //   key: 'remove-liquidity',
      //   title: i18n._(t`Remove`),
      //   link: '/remove',
      // },
      {
        key: 'migrate',
        title: i18n._(t`Migrate`),
        link: '/migrate',
        disabled: !featureEnabled(Feature.MIGRATE, chainId),
      },
      {
        key: 'import',
        title: i18n._(t`Import`),
        link: '/find',
      },
    ]

    const legacy = [...trade, ...liquidity]

    if (featureEnabled(Feature.TRIDENT, chainId)) {
      menu.push({
        key: 'trade',
        title: i18n._(t`Trade`),
        icon: <SwitchVerticalIcon width={20} />,
        items: [
          {
            key: 'trident-swap',
            title: i18n._(t`Swap`),
            link: '/swap',
          },
          {
            key: 'limit',
            title: i18n._(t`Limit order`),
            link: '/limit-order',
            disabled: !featureEnabled(Feature.LIMIT_ORDERS, chainId),
          },
        ].filter((item) => !item.disabled),
      })
      menu.push({
        key: 'liquidity',
        title: i18n._(t`Liquidity`),
        icon: <BeakerIcon width={20} />,
        items: [
          {
            key: 'trident-pools',
            title: i18n._(t`Pools`),
            link: '/trident/pools',
          },
          {
            key: 'trident-create',
            title: i18n._(t`Create`),
            link: '/trident/create',
          },
          {
            key: 'trident-migrate',
            title: i18n._(t`Migrate`),
            link: '/trident/migrate',
          },
        ],
      })
      menu.push({
        key: 'Legacy',
        title: i18n._(t`Legacy`),
        icon: <SwitchVerticalIcon width={20} />,
        items: liquidity.filter((item) => !item?.disabled),
      })
    } else {
      menu.push({
        key: 'trade',
        title: i18n._(t`Trade`),
        icon: <SwitchVerticalIcon width={20} />,
        items: trade.filter((item) => !item?.disabled),
      })
      menu.push({
        key: 'liquidity',
        title: i18n._(t`Liquidity`),
        icon: <BeakerIcon width={20} />,
        items: liquidity.filter((item) => !item?.disabled),
      })
    }

    const exploreMenu: MenuItemLeaf[] = []

    return menu.filter((el) => Object.keys(el).length > 0)
  }, [account, chainId, i18n])
}

export default useMenu
