import moon_image from './assets/moon_image.jpg';

function HowItWorks() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-8">
        How We Calculate the Moon Phase
      </h1>
      <div className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
        <p className="mb-4">
          The moon phase is determined by observing the relative positions of the Moon, Earth, and Sun. To simplify the process, we rely on precise astronomical calculations starting with something called the Julian Date.
        </p>
        <p className="mb-4">
          The Julian Date is a continuous count of days and fractions of a day used by astronomers. It helps ensure accuracy when dealing with time-sensitive calculations by measuring from a fixed point: January 1, 4713 BCE. This forms the foundation for calculating where the Moon is in its cycle today.
        </p>
        <p className="mb-4">
          The Moon completes a full cycle of phases, known as the synodic period, in approximately 29.53 days. By comparing today's date to a reference point within the Moon's cycle, we pinpoint its current position in that cycle.
        </p>
        <p className="mb-4">
          The Moon's cycle is categorized into eight main phases, ranging from the New Moon to the Full Moon, including waxing and waning variations. Based on the Moon's position in the cycle, we assign a phase name, such as "Waxing Gibbous" or "Full Moon."
        </p>
        <p className="mb-4">
          To provide further detail, we calculate the illumination fraction, which measures how much of the Moon’s surface is lit by the Sun and visible from Earth. This is represented as a percentage, offering insight into the Moon’s brightness.
        </p>
        <p className="mb-4">
          We also calculate the Moon's latitude and longitude along its orbital path to determine its precise position in the sky. From this, we identify the zodiac sign the Moon is passing through, adding an astrological dimension to the data.
        </p>
        <p className="mb-4">
          These calculations are adapted from Stephen R. Schmitt’s{' '}<a href="https://web.archive.org/web/20140716104947/http://mysite.verizon.net/res148h4j/zenosamples/zs_lunarphasecalc.html" className="text-blue-500 hover:underline"> detailed algorithms on lunar phase computation</a>. All data is handled in UTC to ensure consistency and accuracy, accounting for any local timezone differences when converting input dates and times.
        </p>
      </div>

      <div className="flex justify-center mt-8">
        <img
          src={moon_image}
          alt="Moon"
          className="rounded-lg shadow-lg"
          style={{ width: '300px', height: 'auto' }}
        />
      </div>
    </div>
  );
}

export default HowItWorks;
