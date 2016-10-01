export class Utilities {
    
    //Return the age of the given birthdate
    public static getAge(birthDate) {
        var now = new Date();    
        var days = Math.floor((now.getTime() - birthDate.getTime())/1000/60/60/24);
        var age = 0;
        for (var y = birthDate.getFullYear(); y <= now.getFullYear(); y++){
            var daysInYear = (y % 4 == 0 && (y % 100 != 0 || y % 400 == 0)) ? 366 : 365;
            if (days >= daysInYear){
                days -= daysInYear;
                age++;
            }
        }
        return age;
    }
}
