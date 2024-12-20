import { FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";

const timeSlots = Array.from({ length: 48 }, (_, i) => {
  const hour = Math.floor(i / 2);
  const minute = i % 2 === 0 ? "00" : "30";
  const ampm = hour < 12 ? "AM" : "PM";
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour}:${minute} ${ampm}`;
});

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface HoursFieldsProps {
  form: UseFormReturn<any>;
}

const HoursFields = ({ form }: HoursFieldsProps) => {
  const handleHoursChange = (day: string, time: string, type: 'open' | 'close') => {
    const currentHours = form.getValues("hours") || days.map(d => `${d}: - -`).join(',');
    const hoursArray = currentHours.split(',');
    
    const dayIndex = days.indexOf(day);
    const [currentDay, currentTimes] = (hoursArray[dayIndex] || `${day}: - -`).split(': ');
    const [openTime, closeTime] = (currentTimes || '- -').split(' - ');
    
    const newHours = [...(hoursArray.length ? hoursArray : days.map(d => `${d}: - -`))];
    newHours[dayIndex] = `${day}: ${type === 'open' ? time : openTime} - ${type === 'close' ? time : closeTime}`;
    
    form.setValue("hours", newHours.join(','));
  };

  const getTimeValues = (day: string) => {
    const currentHours = form.getValues("hours") || '';
    const hoursArray = currentHours.split(',');
    const daySchedule = hoursArray.find(h => h.startsWith(day));
    
    if (!daySchedule) return { open: undefined, close: undefined };
    
    const [, times] = daySchedule.split(': ');
    if (!times) return { open: undefined, close: undefined };
    
    const [open, close] = times.split(' - ');
    return { open, close };
  };

  return (
    <div className="space-y-4">
      <FormLabel>Operating Hours</FormLabel>
      {days.map((day) => {
        const { open, close } = getTimeValues(day);
        return (
          <div key={day} className="grid grid-cols-3 gap-4 items-center">
            <span className="text-sm font-medium">{day}</span>
            <Select onValueChange={(value) => handleHoursChange(day, value, 'open')} value={open}>
              <SelectTrigger>
                <SelectValue placeholder="Opening time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={`${day}-open-${time}`} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => handleHoursChange(day, value, 'close')} value={close}>
              <SelectTrigger>
                <SelectValue placeholder="Closing time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={`${day}-close-${time}`} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      })}
    </div>
  );
};

export default HoursFields;