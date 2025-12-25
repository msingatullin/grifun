import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-white">
            Политика конфиденциальности
          </h1>
          
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-white">1. Общие положения</h2>
              <p>
                Настоящая Политика конфиденциальности определяет порядок обработки и защиты 
                персональных данных пользователей веб-сайта grifun.ru (далее — Сайт), 
                принадлежащего ООО Грифон (далее — Компания).
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-white">2. Персональные данные</h2>
              <p className="mb-3">
                При использовании Сайта мы можем собирать следующие персональные данные:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Имя и фамилия</li>
                <li>Адрес электронной почты</li>
                <li>Номер телефона</li>
                <li>Название компании</li>
                <li>Информация, указанная в форме обратной связи</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-white">3. Цели обработки данных</h2>
              <p className="mb-3">Персональные данные обрабатываются в следующих целях:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Обработка заявок и запросов пользователей</li>
                <li>Предоставление консультаций и услуг</li>
                <li>Коммуникация с пользователями</li>
                <li>Улучшение качества предоставляемых услуг</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-white">4. Защита данных</h2>
              <p>
                Компания принимает необходимые технические и организационные меры для защиты 
                персональных данных от неправомерного доступа, уничтожения, изменения, 
                блокирования, копирования, предоставления, распространения, а также от иных 
                неправомерных действий.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-white">5. Передача данных третьим лицам</h2>
              <p>
                Персональные данные не передаются третьим лицам, за исключением случаев, 
                предусмотренных законодательством Российской Федерации, или при наличии 
                согласия субъекта персональных данных.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-white">6. Права пользователей</h2>
              <p className="mb-3">Пользователь имеет право:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Получать информацию о своих персональных данных</li>
                <li>Требовать уточнения, блокирования или уничтожения персональных данных</li>
                <li>Отозвать согласие на обработку персональных данных</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-white">7. Контакты</h2>
              <p className="mb-2">
                По всем вопросам, связанным с обработкой персональных данных, вы можете 
                обратиться по адресу: info@grifun.ru
              </p>
              <p>
                Дата последнего обновления: {new Date().toLocaleDateString("ru-RU")}
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

