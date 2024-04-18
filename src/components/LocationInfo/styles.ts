import styled from 'styled-components/native'
import theme from '../../theme'

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`

export const Info = styled.View`
  flex: 1;
`

export const Label = styled.Text`
  color: ${theme.colors.gray[300]};
  font-size: ${theme.fontSize.sm};
  font-family: ${theme.fontFamily.bold};
`

export const Description = styled.Text`
  color: ${theme.colors.gray[100]};
  font-size: ${theme.fontSize.sm};
  font-family: ${theme.fontFamily.regular};
`
