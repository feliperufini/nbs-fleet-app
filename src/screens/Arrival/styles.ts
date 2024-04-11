import styled from 'styled-components/native'
import theme from '../../theme'

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.gray[800]};
`

export const Content = styled.View`
  flex-grow: 1;
  padding: 16px 32px 32px 32px;
`

export const Label = styled.Text`
  color: ${theme.colors.gray[300]};
  font-size: ${theme.fontSize.sm};
  font-family: ${theme.fontFamily.regular};
  margin-top: 24px;
  margin-bottom: 5px;
`

export const LicensePlate = styled.Text`
  color: ${theme.colors.gray[100]};
  font-size: ${theme.fontSize.xxxl};
  font-family: ${theme.fontFamily.bold};
`

export const Description = styled.Text`
  color: ${theme.colors.gray[100]};
  font-size: ${theme.fontSize.md};
  font-family: ${theme.fontFamily.regular};
  text-align: justify;
`

export const Footer = styled.View`
  width: 100%;
  flex-direction: row;
  margin-top: 16px;
  gap: 16px;
`
