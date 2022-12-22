import {ref, type Ref} from 'vue'

export type SIZINGS = 'small' | 'medium' | 'large';

class PageDimension {
  private static readonly MOBILE_BREAKPOINT: number = 1200;

  public readonly isMobile: boolean;
  public readonly componentSizing: SIZINGS;

  constructor(public readonly width: number,
              public readonly height: number) {
    this.isMobile = width < PageDimension.MOBILE_BREAKPOINT;

    this.componentSizing = this.isMobile ? 'small' : 'medium';
  }
}

export const pageSize = {
  setup(): Ref<PageDimension> {
    const size$ = ref<PageDimension>(pageSize.getSize())

    window.onresize = () => {
      size$.value = pageSize.getSize()
    }

    return size$
  },
  getSize(): PageDimension {
    return new PageDimension(
      window.innerWidth,
      window.innerHeight)
  }
}
