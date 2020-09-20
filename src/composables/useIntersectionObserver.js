import { ref } from 'vue';

export default function useIntersectionObserver() {
  const isSupported = 'IntersectionObserver' in window;
  if (isSupported) {
    const isIntersecting = ref(false);

    const observer = new IntersectionObserver(entries => {
      const component = entries[0];

      if (component.isIntersecting) {
        isIntersecting.value = true;
      } else {
        isIntersecting.value = false;
      }
    });

    const observe = element => {
      observer.observe(element);
    };

    const unobserve = element => {
      observer.unobserve(element);
    };

    return { observe, unobserve, isIntersecting };
  } else {
    console.log('Your browser does not support this feature');
  }
}
