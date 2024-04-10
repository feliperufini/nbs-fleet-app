import styled from 'styled-components/native'
import theme from '../../theme'

export const Container = styled.View`
  width: 100%;
  padding: 32px 24px;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${theme.colors.gray[700]};
  z-index: 1;
`

export const Title = styled.Text`
  color: ${theme.colors.gray[100]};
  font-size: ${theme.fontSize.xl};
  font-family: ${theme.fontFamily.bold};
`
