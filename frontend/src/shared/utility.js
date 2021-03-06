export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
        return true;
    }

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    return isValid;
};

export const toFirstCharUppercase = name => {
    return name.charAt(0).toUpperCase() + name.slice(1);
};

export const handleLikedMovie = (movieId, likedMovies, onLikeMovie, onDislikeMovie) => {
    const liked = (likedMovies.find(likedMovie => likedMovie.movie === movieId));
    if (liked) {
        onDislikeMovie(liked.id);
    } else {
        onLikeMovie(movieId);
    };
};

export const getSnackbarData = (message, variant) => {
    return {
        message: message,
        options: {
            key: new Date().getTime() + Math.random(),
            variant: variant,
            action: null,
        },
    };
};