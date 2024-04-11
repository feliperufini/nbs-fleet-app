import { forwardRef } from 'react'
import { TextInput, TextInputProps } from 'react-native'
import { useTheme } from 'styled-components/native'
import { Container, Input, Label } from './styles'

type Props = TextInputProps & {
  label: string
}

const TextAreaInput = forwardRef<TextInput, Props>(({ label, ...rest }, ref) => {
  const { colors } = useTheme()

  return (
    <Container>
      <Label>{label}</Label>
      <Input
        ref={ref}
        multiline
        autoCapitalize="sentences"
        placeholderTextColor={colors.gray[400]}
        {...rest}
      />
    </Container>
  )
})

export { TextAreaInput }
