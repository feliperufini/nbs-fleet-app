import { useTheme } from 'styled-components/native'
import { Container, Input, Label } from './styles'
import { TextInputProps } from 'react-native'

type Props = TextInputProps & {
  label: string
}

export function LicensePlateInput({ label, ...rest }: Props) {
  const { colors } = useTheme()

  return (
    <Container>
      <Label>{label}</Label>
      <Input
        maxLength={7}
        autoCapitalize="characters"
        placeholderTextColor={colors.gray[400]}
        {...rest}
      />
    </Container>
  )
}