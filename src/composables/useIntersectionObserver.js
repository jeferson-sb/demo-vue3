import { ref } from 'vue'

export default function useIntersectionObserver() {
  const isSupported = 'IntersectionObserver' in window
  const isIntersecting = ref(false)
  const isShown = ref(false)

  if (!isSupported) {
    console.log('Your browser does not support this feature')
  }

  const observer = new IntersectionObserver((entries) => {
    const component = entries[0]

    if (component.isIntersecting && !isShown.value) {
      isIntersecting.value = true
      isShown.value = true
    } else {
      isIntersecting.value = false
    }
  })

  const observe = (element) => {
    observer.observe(element)
  }

  const unobserve = (element) => {
    observer.unobserve(element)
  }

  return { observe, unobserve, isIntersecting, isShown }
}
