import { TouchableOpacityProps } from 'react-native'
import { Container, Departure, Info, LicensePlate } from './styles'
import { Check, ClockClockwise } from 'phosphor-react-native'
import { useTheme } from 'styled-components/native'

export type HistoricCardProps = {
  id: string
  licensePlate: string
  createdAt: string
  isSync: boolean
}

type Props = TouchableOpacityProps & {
  data: HistoricCardProps
}

export function HistoricCard({ data, ...rest }: Props) {
  const { colors } = useTheme()
  return (
    <Container activeOpacity={0.7} {...rest}>
      <Info>
        <LicensePlate>{data.licensePlate}</LicensePlate>
        <Departure>{data.createdAt}</Departure>
      </Info>
      {data.isSync ?
        <Check size={24} color={colors.green} />
        :
        <ClockClockwise size={24} color={colors.gray[400]} />
      }
    </Container>
  )
}