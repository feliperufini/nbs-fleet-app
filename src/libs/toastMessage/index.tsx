import Toast from 'react-native-toast-message'
import { BaseToast } from 'react-native-toast-message'
import theme from '../../theme'

export default function RootToast() {
  const getToastConfig = (toastColor: string) => ({
    style: {
      backgroundColor: theme.colors.gray[500],
      borderLeftColor: toastColor,
      paddingVertical: 12,
      height: 'auto',
    },
    text1Style: {
      fontSize: 16,
      color: toastColor,
    },
    text2Style: {
      color: theme.colors.gray[100],
      fontSize: 12,
    },
    text2NumberOfLines: 9,
  })

  const toastConfig = {
    success: (props: any) => (
      <BaseToast
        {...props}
        {...getToastConfig(theme.colors.green)}
      />
    ),
    error: (props: any) => (
      <BaseToast
        {...props}
        {...getToastConfig(theme.colors.red)}
      />
    ),
    info: (props: any) => (
      <BaseToast
        {...props}
        {...getToastConfig(theme.colors.teal)}
      />
    ),
  }

  return <Toast config={toastConfig} />
}