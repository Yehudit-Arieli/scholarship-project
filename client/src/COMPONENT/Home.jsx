import '../STYLE/home.css'
import { FaGraduationCap, FaLightbulb, FaHandsHelping } from 'react-icons/fa';

export const Home = () => {
  return (
    <div className="home-container">
      <header className="header">
        <h1>ברוכים הבאים לאתר המילגות</h1>
        <p>מקום אחד למצוא את כל המילגות שאתה צריך ללמוד, לחקור ולהתפתח!</p>
      </header>

      <section className="info-section">
        <h2><FaGraduationCap className="icon" /> מהן מילגות?</h2>
        <p>
          מילגה היא תמיכה כספית הניתנת לסטודנטים, חיילים, וצעירים במטרה לסייע להם במימון לימודים, מחקרים או צרכים אישיים.
          המילגות מציעות סיוע מותאם אישית על פי קריטריונים שונים, ובכך מסייעות בהפחתת העומס הכלכלי ומאפשרות למקבלי המילגות להתמקד בלימודיהם ובפיתוח כישוריהם.
        </p>
      </section>

      <section className="ads-section">
        <h2><FaLightbulb className="icon" /> המלצות למילגות</h2>
        <div className="ads-container">
          <div className="ad">
            <h3>מילגת לימודים לתואר ראשון</h3>
            <p>לסטודנטים בתואר ראשון, אנו מציעים מילגה של עד 10,000 ש"ח לשנה. אל תפספסו!</p>
            <button className="cta-btn">למידע נוסף</button>
          </div>
          <div className="ad">
            <h3>מילגת מחקר וחדשנות</h3>
            <p>סטודנטים לתארים גבוהים? זה הזמן להגיש בקשה למילגת מחקר וחדשנות עם מענק של עד 20,000 ש"ח!</p>
            <button className="cta-btn">למידע נוסף</button>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2><FaHandsHelping className="icon" /> אודות</h2>
        <p>
          אתר המילגות נועד כדי לייעל את תהליך חיפוש המילגות עבור סטודנטים, חיילים משוחררים וצעירים בישראל. אנחנו מספקים את המידע והכלים
          כדי שתוכל למצוא את המילגה המתאימה ביותר עבורך ולהגיש בקשה בצורה נוחה.
        </p>
      </section>

      <section className="cta-section">
        <h2>הגש בקשה למילגה עכשיו!</h2>
        <button className="cta-btn">הגש בקשה</button>
      </section>

      <footer className="footer">
        <p>© 2025 אתר המילגות | <a href="mailto:contact@scholarships.com">צור קשר</a></p>
      </footer>
    </div>
  );
}