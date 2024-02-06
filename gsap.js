
export const removePublication = () => {
    const wrapperPublication = document.querySelector(".wrapper-publication")
    gsap.fromTo(wrapperPublication, {opacity: 1}, {opacity: 0, duration: 1});
    wrapperPublication.remove()
}

export const showPublication = () => {
    const wrapperPublication = document.querySelector(".wrapper-publication")
    gsap.fromTo(wrapperPublication, {opacity: 0}, {opacity: 1, duration: 1});
}

