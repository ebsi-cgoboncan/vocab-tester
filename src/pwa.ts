import { registerSW, type RegisterSWOptions } from 'virtual:pwa-register'

type OnRegisteredSW = RegisterSWOptions['onRegisteredSW']

const useServiceWorker = () => {
  const serviceWorker = navigator.serviceWorker
  if (!serviceWorker) return
  let refreshing = false

  const onControllerChange = () => {
    if (refreshing) return
    refreshing = true
    window.location.reload()
  }

  serviceWorker.addEventListener('controllerchange', onControllerChange)
}

const registerServiceWorker = () => {
  const onRegisteredSW: OnRegisteredSW = (_, registration) => {
    if (!registration) return
    registration.update()
  }

  const opts: RegisterSWOptions = {
    immediate: true,
    onRegisteredSW,
  }

  registerSW(opts)
}

export const usePwa = () => {
  useServiceWorker()
  registerServiceWorker()
}
