import format from "./format";

const getEventKey = day => `ev_${format(day, "D")}_${format(day, "M")}_${format(day, "YYYY")}`;

const getDayKey = day => `day_${format(day, "D")}_${format(day, "M")}_${format(day, "YYYY")}`;

const getDate = day => {
    return {
        day: format(day, "D"),
        month: format(day, "M"),
        year: format(day, "YYYY")
    }
};

const getStoredEvents = () => {
    return JSON.parse(localStorage.getItem("events"));
};

const isInclude = (target, input) => target.toLowerCase().includes(input.toLowerCase());

export {getEventKey, getDayKey, getDate, getStoredEvents, isInclude};