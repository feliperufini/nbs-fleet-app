import styled from 'styled-components/native'
import theme from '../../theme'

export const Container = styled.ImageBackground`
	flex: 1;
	justify-content: center;
	padding: 52px;
	background-color: ${theme.colors.gray[800]};
`

export const Title = styled.Text`
  color: ${theme.colors.brandLight};
	font-size: ${theme.fontSize.xxxl};
	font-family: ${theme.fontFamily.bold};
	text-align: center;
`

export const Slogan = styled.Text`
  color: ${theme.colors.gray[100]};
	font-size: ${theme.fontSize.md};
	font-family: ${theme.fontFamily.regular};
	text-align: center;
	margin-bottom: 32px;
`
