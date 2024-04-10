import styled from 'styled-components/native'
import theme from '../../theme'

export const Container = styled.View`
  width: 100%;
  padding: 16px;
  border-radius: 6px;
  background-color: ${theme.colors.gray[700]};
`

export const Label = styled.Text`
  color: ${theme.colors.gray[300]};
  font-size: ${theme.fontSize.sm};
  font-family: ${theme.fontFamily.regular};
`

export const Input = styled.TextInput`
  color: ${theme.colors.gray[200]};
  font-size: ${theme.fontSize.xxxl};
  font-family: ${theme.fontFamily.bold};
  text-align: center;
  margin-top: 16px;
`
