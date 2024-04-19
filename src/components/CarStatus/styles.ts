import styled from 'styled-components/native'
import theme from '../../theme'

export const Container = styled.TouchableOpacity`
  width: 100%;
  margin: 32px 0;
  padding: 22px;
  border-radius: 6px;
  background-color: ${theme.colors.gray[700]};
  flex-direction: row;
  align-items: center;
`

export const IconBox = styled.View`
  width: 77px;
  height: 77px;
  border-radius: 6px;
  background-color: ${theme.colors.gray[600]};
  margin-right: 12px;
  justify-content: center;
  align-items: center;
`

export const Message = styled.Text`
  color: ${theme.colors.gray[100]};
  font-size: ${theme.fontSize.sm};
  font-family: ${theme.fontFamily.regular};
  flex: 1;
  text-align: justify;
  textAlignVertical: center;
`

export const TextHighlight = styled.Text`
  color: ${theme.colors.brandMid};
  font-size: ${theme.fontSize.sm};
  font-family: ${theme.fontFamily.bold};
`
