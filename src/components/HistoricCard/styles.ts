import styled from 'styled-components/native'
import theme from '../../theme'

export const Container = styled.TouchableOpacity`
  width: 100%;
  background-color: ${theme.colors.gray[700]};
  padding: 20px 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px;
  margin-bottom: 12px;
`

export const Info = styled.View`
  flex: 1;
`

export const LicensePlate = styled.Text`
  color: ${theme.colors.white};
  font-size: ${theme.fontSize.md};
  font-family: ${theme.fontFamily.bold};
`

export const Departure = styled.Text`
  color: ${theme.colors.gray[200]};
  font-size: ${theme.fontSize.xs};
  font-family: ${theme.fontFamily.regular};
  margin-top: 4px;
`
