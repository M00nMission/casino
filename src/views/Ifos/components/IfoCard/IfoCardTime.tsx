import React from 'react'
import styled from 'styled-components'
import { Flex, Link } from '@lydiafinance/uikit'
import { IfoStatus } from 'config/constants/types'
import getTimePeriods from 'utils/getTimePeriods'
import { useTranslation } from 'contexts/Localization'

export interface IfoCardTimeProps {
  status: IfoStatus
  secondsUntilStart: number
  secondsUntilEnd: number
  block: number
}

const Details = styled.div`
  align-items: center;
  display: flex;
  height: 24px;
  justify-content: center;
  margin-bottom: 24px;
`

const Countdown = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 20px;
  font-weight: 600;
  text-align: center;
`

const IfoCardTime: React.FC<IfoCardTimeProps> = ({ status, secondsUntilStart, secondsUntilEnd, block }) => {
  const { t } = useTranslation()
  const countdownToUse = status === 'coming_soon' ? secondsUntilStart : secondsUntilEnd
  const timeUntil = getTimePeriods(countdownToUse)
  const suffix = status === 'coming_soon' ? 'start' : 'finish'

  if (status === 'idle') {
    return (
      <Flex alignItems="center" justifyContent="center" mb="24px" height="24px">
        {t('Loading...')}
      </Flex>
    )
  }

  return (
    <Details>
      <Countdown>{`${timeUntil.days}d, ${timeUntil.hours}h, ${timeUntil.minutes}m until ${suffix}`}</Countdown>
      <Link
        href={`https://cchain.explorer.avax.network/block/countdown/${block}`}
        target="blank"
        rel="noopener noreferrer"
        ml="8px"
      >
        (blocks)
      </Link>
    </Details>
  )
}

export default IfoCardTime
