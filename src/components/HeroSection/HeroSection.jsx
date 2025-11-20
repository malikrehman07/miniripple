import './HeroSection.css';
import Container from "../Container/Container";
import { AnimFadeUp } from '../../animations/AnimFadeUp';
import { AnimSlideInLeft } from '../../animations/AnimSlideInLeft';
import { AnimFadeIn } from '../../animations/AnimFadeIn';
import { useTheme } from '@/contexts/ThemeContext';

export default function HeroSection({ children }) {
    const { theme } = useTheme();
    return (
        <section className="hero-section">
            <Container>
                <article className='content'>
                    <div className="content-wrap">
                        <div className="dotted-pattern">
                            <AnimFadeUp>
                                {
                                    {
                                        light: (<svg width="159" height="148" viewBox="0 0 159 148" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.194336 0H4.461V4H0.194336V0Z" fill="#4890EF"/>
                                            <path d="M25.7943 0H30.061V4H25.7943V0Z" fill="#4890EF"/>
                                            <path d="M51.3943 0H55.661V4H51.3943V0Z" fill="#4890EF"/>
                                            <path d="M76.9943 0H81.261V4H76.9943V0Z" fill="#4890EF"/>
                                            <path d="M102.594 0H106.861V4H102.594V0Z" fill="#4890EF"/>
                                            <path d="M128.194 0H132.461V4H128.194V0Z" fill="#4890EF"/>
                                            <path d="M153.794 0H158.061V4H153.794V0Z" fill="#4890EF"/>
                                            <path d="M0.194336 24H4.461V28H0.194336V24Z" fill="#4890EF"/>
                                            <path d="M25.7943 24H30.061V28H25.7943V24Z" fill="#4890EF"/>
                                            <path d="M51.3943 24H55.661V28H51.3943V24Z" fill="#4890EF"/>
                                            <path d="M76.9943 24H81.261V28H76.9943V24Z" fill="#4890EF"/>
                                            <path d="M102.594 24H106.861V28H102.594V24Z" fill="#4890EF"/>
                                            <path d="M128.194 24H132.461V28H128.194V24Z" fill="#4890EF"/>
                                            <path d="M153.794 24H158.061V28H153.794V24Z" fill="#4890EF"/>
                                            <path d="M0.194336 48H4.461V52H0.194336V48Z" fill="#4890EF"/>
                                            <path d="M25.7943 48H30.061V52H25.7943V48Z" fill="#4890EF"/>
                                            <path d="M51.3943 48H55.661V52H51.3943V48Z" fill="#4890EF"/>
                                            <path d="M76.9943 48H81.261V52H76.9943V48Z" fill="#4890EF"/>
                                            <path d="M102.594 48H106.861V52H102.594V48Z" fill="#4890EF"/>
                                            <path d="M128.194 48H132.461V52H128.194V48Z" fill="#4890EF"/>
                                            <path d="M153.794 48H158.061V52H153.794V48Z" fill="#4890EF"/>
                                            <path d="M0.194336 72H4.461V76H0.194336V72Z" fill="#4890EF"/>
                                            <path d="M25.7943 72H30.061V76H25.7943V72Z" fill="#4890EF"/>
                                            <path d="M51.3943 72H55.661V76H51.3943V72Z" fill="#4890EF"/>
                                            <path d="M76.9943 72H81.261V76H76.9943V72Z" fill="#4890EF"/>
                                            <path d="M102.594 72H106.861V76H102.594V72Z" fill="#4890EF"/>
                                            <path d="M128.194 72H132.461V76H128.194V72Z" fill="#4890EF"/>
                                            <path d="M153.794 72H158.061V76H153.794V72Z" fill="#4890EF"/>
                                            <path d="M0.194336 96H4.461V100H0.194336V96Z" fill="#4890EF"/>
                                            <path d="M25.7943 96H30.061V100H25.7943V96Z" fill="#4890EF"/>
                                            <path d="M51.3943 96H55.661V100H51.3943V96Z" fill="#4890EF"/>
                                            <path d="M76.9943 96H81.261V100H76.9943V96Z" fill="#4890EF"/>
                                            <path d="M102.594 96H106.861V100H102.594V96Z" fill="#4890EF"/>
                                            <path d="M128.194 96H132.461V100H128.194V96Z" fill="#4890EF"/>
                                            <path d="M153.794 96H158.061V100H153.794V96Z" fill="#4890EF"/>
                                            <path d="M0.194336 120H4.461V124H0.194336V120Z" fill="#4890EF"/>
                                            <path d="M25.7943 120H30.061V124H25.7943V120Z" fill="#4890EF"/>
                                            <path d="M51.3943 120H55.661V124H51.3943V120Z" fill="#4890EF"/>
                                            <path d="M76.9943 120H81.261V124H76.9943V120Z" fill="#4890EF"/>
                                            <path d="M102.594 120H106.861V124H102.594V120Z" fill="#4890EF"/>
                                            <path d="M128.194 120H132.461V124H128.194V120Z" fill="#4890EF"/>
                                            <path d="M153.794 120H158.061V124H153.794V120Z" fill="#4890EF"/>
                                            <path d="M0.194336 144H4.461V148H0.194336V144Z" fill="#4890EF"/>
                                            <path d="M25.7943 144H30.061V148H25.7943V144Z" fill="#4890EF"/>
                                            <path d="M51.3943 144H55.661V148H51.3943V144Z" fill="#4890EF"/>
                                            <path d="M76.9943 144H81.261V148H76.9943V144Z" fill="#4890EF"/>
                                            <path d="M102.594 144H106.861V148H102.594V144Z" fill="#4890EF"/>
                                            <path d="M128.194 144H132.461V148H128.194V144Z" fill="#4890EF"/>
                                            <path d="M153.794 144H158.061V148H153.794V144Z" fill="#4890EF"/>
                                            </svg>
                                            ),
                                        dark: (<svg width="159" height="148" viewBox="0 0 159 148" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g opacity="0.3">
                                                <path d="M0.194092 0H4.46076V4H0.194092V0Z" fill="#C4C4C4" />
                                                <path d="M25.7941 0H30.0608V4H25.7941V0Z" fill="#C4C4C4" />
                                                <path d="M51.3941 0H55.6608V4H51.3941V0Z" fill="#C4C4C4" />
                                                <path d="M76.9941 0H81.2608V4H76.9941V0Z" fill="#C4C4C4" />
                                                <path d="M102.594 0H106.861V4H102.594V0Z" fill="#C4C4C4" />
                                                <path d="M128.194 0H132.461V4H128.194V0Z" fill="#C4C4C4" />
                                                <path d="M153.794 0H158.061V4H153.794V0Z" fill="#C4C4C4" />
                                                <path d="M0.194092 24H4.46076V28H0.194092V24Z" fill="#C4C4C4" />
                                                <path d="M25.7941 24H30.0608V28H25.7941V24Z" fill="#C4C4C4" />
                                                <path d="M51.3941 24H55.6608V28H51.3941V24Z" fill="#C4C4C4" />
                                                <path d="M76.9941 24H81.2608V28H76.9941V24Z" fill="#C4C4C4" />
                                                <path d="M102.594 24H106.861V28H102.594V24Z" fill="#C4C4C4" />
                                                <path d="M128.194 24H132.461V28H128.194V24Z" fill="#C4C4C4" />
                                                <path d="M153.794 24H158.061V28H153.794V24Z" fill="#C4C4C4" />
                                                <path d="M0.194092 48H4.46076V52H0.194092V48Z" fill="#C4C4C4" />
                                                <path d="M25.7941 48H30.0608V52H25.7941V48Z" fill="#C4C4C4" />
                                                <path d="M51.3941 48H55.6608V52H51.3941V48Z" fill="#C4C4C4" />
                                                <path d="M76.9941 48H81.2608V52H76.9941V48Z" fill="#C4C4C4" />
                                                <path d="M102.594 48H106.861V52H102.594V48Z" fill="#C4C4C4" />
                                                <path d="M128.194 48H132.461V52H128.194V48Z" fill="#C4C4C4" />
                                                <path d="M153.794 48H158.061V52H153.794V48Z" fill="#C4C4C4" />
                                                <path d="M0.194092 72H4.46076V76H0.194092V72Z" fill="#C4C4C4" />
                                                <path d="M25.7941 72H30.0608V76H25.7941V72Z" fill="#C4C4C4" />
                                                <path d="M51.3941 72H55.6608V76H51.3941V72Z" fill="#C4C4C4" />
                                                <path d="M76.9941 72H81.2608V76H76.9941V72Z" fill="#C4C4C4" />
                                                <path d="M102.594 72H106.861V76H102.594V72Z" fill="#C4C4C4" />
                                                <path d="M128.194 72H132.461V76H128.194V72Z" fill="#C4C4C4" />
                                                <path d="M153.794 72H158.061V76H153.794V72Z" fill="#C4C4C4" />
                                                <path d="M0.194092 96H4.46076V100H0.194092V96Z" fill="#C4C4C4" />
                                                <path d="M25.7941 96H30.0608V100H25.7941V96Z" fill="#C4C4C4" />
                                                <path d="M51.3941 96H55.6608V100H51.3941V96Z" fill="#C4C4C4" />
                                                <path d="M76.9941 96H81.2608V100H76.9941V96Z" fill="#C4C4C4" />
                                                <path d="M102.594 96H106.861V100H102.594V96Z" fill="#C4C4C4" />
                                                <path d="M128.194 96H132.461V100H128.194V96Z" fill="#C4C4C4" />
                                                <path d="M153.794 96H158.061V100H153.794V96Z" fill="#C4C4C4" />
                                                <path d="M0.194092 120H4.46076V124H0.194092V120Z" fill="#C4C4C4" />
                                                <path d="M25.7941 120H30.0608V124H25.7941V120Z" fill="#C4C4C4" />
                                                <path d="M51.3941 120H55.6608V124H51.3941V120Z" fill="#C4C4C4" />
                                                <path d="M76.9941 120H81.2608V124H76.9941V120Z" fill="#C4C4C4" />
                                                <path d="M102.594 120H106.861V124H102.594V120Z" fill="#C4C4C4" />
                                                <path d="M128.194 120H132.461V124H128.194V120Z" fill="#C4C4C4" />
                                                <path d="M153.794 120H158.061V124H153.794V120Z" fill="#C4C4C4" />
                                                <path d="M0.194092 144H4.46076V148H0.194092V144Z" fill="#C4C4C4" />
                                                <path d="M25.7941 144H30.0608V148H25.7941V144Z" fill="#C4C4C4" />
                                                <path d="M51.3941 144H55.6608V148H51.3941V144Z" fill="#C4C4C4" />
                                                <path d="M76.9941 144H81.2608V148H76.9941V144Z" fill="#C4C4C4" />
                                                <path d="M102.594 144H106.861V148H102.594V144Z" fill="#C4C4C4" />
                                                <path d="M128.194 144H132.461V148H128.194V144Z" fill="#C4C4C4" />
                                                <path d="M153.794 144H158.061V148H153.794V144Z" fill="#C4C4C4" />
                                            </g>
                                        </svg>)
                                    }[theme]
                                }
                            
                            </AnimFadeUp>
                        </div>
                        <div className="line-pattern_1">
                            <AnimFadeUp>
                                {
                                    {
                                        light: (<svg width="113" height="17" viewBox="0 0 113 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.02148 11.6668L14.7993 3.3335L23.6881 11.6668L31.2437 4.5835L38.7993 11.6668L46.3548 4.5835L53.9104 11.6668L61.4659 4.5835L69.0215 11.6668L76.577 4.5835L84.1326 11.6668L91.6881 4.5835L99.2437 11.6668L106.799 4.5835" stroke="#4890EF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M106.799 1C109.254 1 111.133 2.85068 111.133 5C111.133 7.14932 109.254 9 106.799 9C104.344 8.99984 102.466 7.14923 102.466 5C102.466 2.85077 104.344 1.00016 106.799 1Z" fill="#002F86" stroke="url(#paint0_linear_615_895)" stroke-width="2"/>
                                            <path d="M5.46582 7.66666C7.92083 7.66666 9.7998 9.51733 9.7998 11.6667C9.7998 13.816 7.92083 15.6667 5.46582 15.6667C3.01097 15.6665 1.13281 13.8159 1.13281 11.6667C1.13281 9.51743 3.01097 7.66682 5.46582 7.66666Z" fill="#002F86" stroke="url(#paint1_linear_615_895)" stroke-width="2"/>
                                            <defs>
                                            <linearGradient id="paint0_linear_615_895" x1="104.657" y1="3.68306" x2="109.203" y2="10.5585" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#4890EF"/>
                                            <stop offset="1" stop-color="#4890EF"/>
                                            </linearGradient>
                                            <linearGradient id="paint1_linear_615_895" x1="3.3241" y1="10.3497" x2="7.86977" y2="17.2252" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#4890EF"/>
                                            <stop offset="1" stop-color="#4890EF"/>
                                            </linearGradient>
                                            </defs>
                                            </svg>                                            
                                            ),
                                        dark: (<svg width="113" height="17" viewBox="0 0 113 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.02234 11.6668L14.8001 3.3335L23.689 11.6668L31.2446 4.5835L38.8001 11.6668L46.3557 4.5835L53.9112 11.6668L61.4668 4.5835L69.0223 11.6668L76.5779 4.5835L84.1334 11.6668L91.689 4.5835L99.2446 11.6668L106.8 4.5835" stroke="#E6EFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M106.8 1C109.255 1 111.134 2.85068 111.134 5C111.134 7.14932 109.255 9 106.8 9C104.345 8.99984 102.467 7.14923 102.467 5C102.467 2.85077 104.345 1.00016 106.8 1Z" fill="#002F86" stroke="white" stroke-width="2"/>
                                            <path d="M5.46631 7.66669C7.92132 7.66669 9.80029 9.51736 9.80029 11.6667C9.80029 13.816 7.92132 15.6667 5.46631 15.6667C3.01146 15.6665 1.1333 13.8159 1.1333 11.6667C1.1333 9.51746 3.01146 7.66685 5.46631 7.66669Z" fill="#002F86" stroke="white" stroke-width="2"/>
                                            </svg>)
                                    }[theme]
                                }
                            
                            </AnimFadeUp>
                        </div>
                        <div className="line-pattern_2">
                        <AnimSlideInLeft>
                            {
                                {
                                    light: (<svg width="18" height="102" viewBox="0 0 18 102" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.1466 97.0004L3.61328 88.2004L12.1466 80.2003L4.89328 73.4003L12.1466 66.6003L4.89328 59.8003L12.1466 53.0003L4.89328 46.2003L12.1466 39.4003L4.89328 32.6003L12.1466 25.8002L4.89328 19.0002L12.1466 12.2002L4.89328 5.40021" stroke="#4890EF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M1.2002 5.40045C1.20019 3.36158 2.98312 1.60065 5.32031 1.60065C7.65745 1.6007 9.44043 3.36161 9.44043 5.40045C9.44031 7.43921 7.65737 9.2002 5.32031 9.20026C2.9832 9.20026 1.20031 7.43924 1.2002 5.40045Z" fill="#002F86" stroke="url(#paint0_linear_615_899)" stroke-width="2"/>
                                        <path d="M8.02734 96.6006C8.02734 94.5617 9.81027 92.8008 12.1475 92.8008C14.4846 92.8008 16.2676 94.5617 16.2676 96.6006C16.2675 98.6393 14.4845 100.4 12.1475 100.4C9.81035 100.4 8.02746 98.6394 8.02734 96.6006Z" fill="#002F86" stroke="url(#paint1_linear_615_899)" stroke-width="2"/>
                                        <defs>
                                        <linearGradient id="paint0_linear_615_899" x1="3.97166" y1="7.32809" x2="10.4333" y2="2.46745" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#4890EF"/>
                                        <stop offset="1" stop-color="#4890EF"/>
                                        </linearGradient>
                                        <linearGradient id="paint1_linear_615_899" x1="10.7988" y1="98.5282" x2="17.2604" y2="93.6676" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#4890EF"/>
                                        <stop offset="1" stop-color="#4890EF"/>
                                        </linearGradient>
                                        </defs>
                                        </svg>
                                        ),
                                    dark: (<svg width="18" height="102" viewBox="0 0 18 102" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.1468 97.0004L3.6134 88.2004L12.1468 80.2003L4.8934 73.4003L12.1467 66.6003L4.8934 59.8003L12.1467 53.0003L4.8934 46.2003L12.1467 39.4003L4.8934 32.6003L12.1467 25.8002L4.8934 19.0002L12.1467 12.2002L4.8934 5.40021" stroke="#E6EFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M1.19995 5.40039C1.19995 3.36152 2.98287 1.60059 5.32007 1.60059C7.65721 1.60064 9.44019 3.36155 9.44019 5.40039C9.44007 7.43914 7.65713 9.20014 5.32007 9.2002C2.98295 9.2002 1.20007 7.43918 1.19995 5.40039Z" fill="#002F86" stroke="white" stroke-width="2"/>
                                        <path d="M8.02673 96.6006C8.02673 94.5617 9.80966 92.8008 12.1469 92.8008C14.484 92.8008 16.267 94.5617 16.267 96.6006C16.2668 98.6393 14.4839 100.4 12.1469 100.4C9.80974 100.4 8.02685 98.6394 8.02673 96.6006Z" fill="#002F86" stroke="white" stroke-width="2"/>
                                        </svg>)
                                }[theme]
                            }
                        
                            </AnimSlideInLeft>
                        </div>
                        <div className="circle-pattern_1">
                            <AnimFadeIn delay={0.5}>
                            <svg width="90" height="83" viewBox="0 0 90 83" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M51.897 82.1815C56.787 82.1815 61.629 81.2785 66.1467 79.5242C70.6645 77.7698 74.7694 75.1984 78.2271 71.9568C81.6848 68.7152 84.4276 64.8669 86.2989 60.6315C88.1702 56.3961 89.1334 51.8567 89.1334 47.2724L51.897 47.2724L51.897 82.1815Z" fill="#00E1F0"/>
                            <path opacity="0.1" d="M29.4 54.0001C33.182 54.0001 36.9271 53.3017 40.4213 51.9449C43.9154 50.588 47.0903 48.5992 49.7647 46.092C52.439 43.5848 54.5604 40.6084 56.0077 37.3326C57.455 34.0568 58.2 30.5458 58.2 27.0001L29.4 27.0001L29.4 54.0001Z" fill="#E8F2FF"/>
                            </svg>
                            </AnimFadeIn>
                        </div>
                        <div className="circle-pattern_2">
                            <AnimFadeIn delay={0.5}>
                                {
                                    {
                                        light:(<svg width="173" height="161" viewBox="0 0 173 161" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M100.37 160.344C109.855 160.344 119.248 158.592 128.011 155.189C136.774 151.786 144.737 146.799 151.444 140.511C158.151 134.223 163.472 126.758 167.102 118.542C170.731 110.327 172.6 101.521 172.6 92.6287L100.37 92.6287L100.37 160.344Z" fill="#FDBC64"/>
                                            <path d="M56.7322 105.678C64.0685 105.678 71.333 104.323 78.1108 101.691C84.8887 99.0593 91.0472 95.2015 96.2347 90.3382C101.422 85.4749 105.537 79.7013 108.345 73.347C111.152 66.9928 112.597 60.1824 112.597 53.3046L56.7322 53.3046L56.7322 105.678Z" fill="#D4D4D4"/>
                                            </svg>
                                            ),
                                        dark:(<svg width="173" height="161" viewBox="0 0 173 161" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M100.37 160.344C109.855 160.344 119.247 158.592 128.011 155.189C136.774 151.786 144.736 146.799 151.444 140.511C158.151 134.223 163.471 126.758 167.101 118.542C170.731 110.327 172.599 101.521 172.599 92.6287L100.37 92.6287L100.37 160.344Z" fill="#FDBC64"/>
                                            <path opacity="0.3" d="M56.7317 105.678C64.068 105.678 71.3325 104.323 78.1103 101.691C84.8882 99.0593 91.0467 95.2015 96.2342 90.3382C101.422 85.4749 105.537 79.7013 108.344 73.347C111.152 66.9928 112.597 60.1824 112.597 53.3046L56.7317 53.3046L56.7317 105.678Z" fill="#E8F2FF"/>
                                            </svg>)
                                    }[theme]
                                }
                            
                            </AnimFadeIn>
                        </div>
                        <AnimFadeUp delay={0.5}>
                        <div className='content-area'>
                            {children}
                        </div>
                        </AnimFadeUp>
                    </div>
                </article>
            </Container>
        </section>
    )
};