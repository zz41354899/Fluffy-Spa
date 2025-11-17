import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from './components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './components/ui/accordion'
import {
  Card,
  CardContent,
} from './components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './components/ui/form'
import { Input } from './components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './components/ui/select'
import { Textarea } from './components/ui/textarea'

const scrollToSection = (id: string) => {
  const el = document.getElementById(id)
  if (!el) return
  window.scrollTo({
    top: el.offsetTop - 80,
    behavior: 'smooth',
  })
}

const bookingSchema = z.object({
  name: z.string().min(1, '請輸入聯絡人姓名'),
  phone: z.string().min(6, '請輸入有效電話'),
  email: z.string().email('請輸入正確 Email').optional().or(z.literal('')),
  petType: z.string().min(1, '請選擇寵物類型'),
  serviceType: z.string().min(1, '請選擇服務類型'),
  date: z.string().optional(),
  notes: z.string().optional(),
})

type BookingFormValues = z.infer<typeof bookingSchema>

const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      petType: 'dog',
      serviceType: 'basic',
      date: '',
      notes: '',
    },
  })

  const handleSubmit = (values: BookingFormValues) => {
    // 簡單示意：實際可改成整合後端或外部服務
    // eslint-disable-next-line no-alert
    alert(`已收到預約需求，感謝 ${values.name || '客人'}！`)
    form.reset()
  }

  const handleNavClick = (id: string) => {
    scrollToSection(id)
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <span className="text-2xl">🐾</span>
            <span className="text-lg font-bold text-slate-900">
              Fluffy Spa
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            <button
              type="button"
              className="px-3 py-2 text-sm text-slate-600 hover:text-slate-900 transition rounded-md hover:bg-slate-100"
              onClick={() => scrollToSection('services')}
            >
              服務
            </button>
            <button
              type="button"
              className="px-3 py-2 text-sm text-slate-600 hover:text-slate-900 transition rounded-md hover:bg-slate-100"
              onClick={() => scrollToSection('faq')}
            >
              常見問題
            </button>
            <button
              type="button"
              className="px-3 py-2 text-sm text-slate-600 hover:text-slate-900 transition rounded-md hover:bg-slate-100"
              onClick={() => scrollToSection('booking')}
            >
              預約
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-md hover:bg-slate-100 transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>

          <Button size="sm" onClick={() => scrollToSection('booking')} className="hidden md:inline-flex">
            立即預約
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <nav className="flex flex-col gap-1 px-4 py-3">
              <button
                type="button"
                className="px-3 py-2 text-sm text-slate-600 hover:text-slate-900 transition rounded-md hover:bg-slate-100 text-left"
                onClick={() => handleNavClick('services')}
              >
                服務
              </button>
              <button
                type="button"
                className="px-3 py-2 text-sm text-slate-600 hover:text-slate-900 transition rounded-md hover:bg-slate-100 text-left"
                onClick={() => handleNavClick('faq')}
              >
                常見問題
              </button>
              <button
                type="button"
                className="px-3 py-2 text-sm text-slate-600 hover:text-slate-900 transition rounded-md hover:bg-slate-100 text-left"
                onClick={() => handleNavClick('booking')}
              >
                預約
              </button>
              <Button size="sm" onClick={() => handleNavClick('booking')} className="w-full mt-2">
                立即預約
              </Button>
            </nav>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-4 md:px-6 md:pt-10 lg:px-8">
        {/* Hero */}
        <section className="space-y-8 py-16 md:py-24" id="hero">
          <div className="space-y-6 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              溫柔美容，讓毛孩每天都開心
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              專業寵物美容團隊，使用寵物專用安全產品，針對每隻毛孩客製化美容流程。
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button size="lg" onClick={() => scrollToSection('booking')}>
                立即預約
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('services')}
              >
                查看服務
              </Button>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-3 pt-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-slate-900">500+</p>
              <p className="text-sm text-slate-600 mt-2">隻毛孩已服務</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-slate-900">4.9 ★</p>
              <p className="text-sm text-slate-600 mt-2">Google 評價</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-slate-900">100%</p>
              <p className="text-sm text-slate-600 mt-2">寵物安全產品</p>
            </div>
          </div>
        </section>

        {/* About / Why choose us */}
        <section className="space-y-12 py-20 border-t border-slate-200" id="about">
          <div className="space-y-3 text-center">
            <h2 className="text-3xl font-bold text-slate-900">
              為什麼選擇我們
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              我們相信毛孩是家人，從環境、用品到流程，都以「減壓、安全、舒服」為第一優先。
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-900">認證美容師</h3>
              <p className="text-sm text-slate-600">
                具備專業證照與實務經驗，定期進修最新知識，遵守低壓力處理原則。
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-900">安全產品</h3>
              <p className="text-sm text-slate-600">
                全程使用寵物專用產品，無矽靈、無刺激性，針對敏感膚質調整。
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-900">清潔環境</h3>
              <p className="text-sm text-slate-600">
                獨立分區設計，定時消毒，降低聲音與氣味壓力，讓毛孩放心等待。
              </p>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="space-y-12 py-20" id="services">
          <div className="space-y-3 text-center">
            <h2 className="text-3xl font-bold text-slate-900">
              服務項目
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              依照毛孩體型與需求客製化的美容服務
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-4 rounded-lg border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900">小型犬基礎 Spa</h3>
              <p className="text-2xl font-bold text-slate-900">NT$ 900</p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>・溫和深層洗澡與吹整</li>
                <li>・指甲修剪、清耳、剃腳底毛</li>
                <li>・簡易造型修剪</li>
              </ul>
            </div>

            <div className="space-y-4 rounded-lg border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900">貓咪舒壓美容</h3>
              <p className="text-2xl font-bold text-slate-900">NT$ 1,200</p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>・溫度與水量客製化控制</li>
                <li>・專用貓咪吹水與柔軟毛巾</li>
                <li>・去毛結與基礎修剪</li>
              </ul>
            </div>

            <div className="space-y-4 rounded-lg border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900">全方位造型設計</h3>
              <p className="text-2xl font-bold text-slate-900">NT$ 1,800</p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>・依犬種與毛質客製剪裁</li>
                <li>・全程說明與造型溝通</li>
                <li>・可加購保養／護毛課程</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="space-y-12 py-20 border-t border-slate-200" id="process">
          <div className="space-y-3 text-center">
            <h2 className="text-3xl font-bold text-slate-900">
              美容流程
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              四個簡單步驟，完成一次安心的美容體驗
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {[
              {
                title: '線上預約',
                description: '填寫基本資料與需求，選擇適合的日期與時間。',
              },
              {
                title: '到店諮詢',
                description: '美容師了解毛孩個性、皮膚狀況與照顧方式。',
              },
              {
                title: '溫柔美容',
                description: '依照討論的流程，完成洗澡、吹整與修剪。',
              },
              {
                title: '開心接送',
                description: '確認造型與狀況，給予居家照顧建議。',
              },
            ].map((step, index) => (
              <div
                key={step.title}
                className="space-y-3 text-center"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                  {index + 1}
                </div>
                <h3 className="font-semibold text-slate-900">{step.title}</h3>
                <p className="text-sm text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="space-y-12 py-20" id="testimonials">
          <div className="space-y-3 text-center">
            <h2 className="text-3xl font-bold text-slate-900">
              客戶評價
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: '球球・柯基',
                content:
                  '以前洗澡都很抗拒，來這邊幾次之後，看到美容師反而會自己搖尾巴走過去。',
              },
              {
                name: 'Momo・米克斯',
                content:
                  '店內很乾淨也沒有太重的味道，工作人員都會主動回報狀況，讓人很安心。',
              },
              {
                name: '布丁・英短貓',
                content:
                  '貓咪本身很緊張，但美容師動作很溫柔，回家後毛很蓬鬆也沒有打結。',
              },
            ].map((item) => (
              <div key={item.name} className="space-y-3 rounded-lg border border-slate-200 p-6">
                <p className="font-semibold text-slate-900">{item.name}</p>
                <p className="text-sm text-slate-600">{item.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ 使用 Accordion */}
        <section className="space-y-8 py-20 border-t border-slate-200" id="faq">
          <div className="space-y-3 text-center">
            <h2 className="text-3xl font-bold text-slate-900">
              常見問題
            </h2>
          </div>
          <Accordion type="single" collapsible className="mx-auto max-w-2xl">
            <AccordionItem value="before-visit">
              <AccordionTrigger>
                帶毛孩來之前需要做什麼準備？
              </AccordionTrigger>
              <AccordionContent>
                建議先讓毛孩上廁所，並準備平常使用的牽繩或外出籠。若毛孩有特殊狀況，請提前告知美容師。
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="time">
              <AccordionTrigger>
                一次美容大概要花多久時間？
              </AccordionTrigger>
              <AccordionContent>
                小型犬基礎美容約 1.5 小時，貓咪或完整造型約 2–3 小時，如有排隊可能會再稍微增加。
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="vaccines">
              <AccordionTrigger>
                是否需要完成疫苗或除蟲才可以預約？
              </AccordionTrigger>
              <AccordionContent>
                為了保護其他毛孩與環境安全，我們建議毛孩至少完成基礎疫苗與體外除蟲，如未完成也請事先告知。
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="cancel">
              <AccordionTrigger>
                臨時有事想改期或取消該怎麼辦？
              </AccordionTrigger>
              <AccordionContent>
                可以直接透過電話或社群私訊與我們聯繫，若需取消請盡量提前一天告知。
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Booking / contact */}
        <section className="space-y-8 py-20 border-t border-slate-200" id="booking">
          <div className="space-y-3 text-center">
            <h2 className="text-3xl font-bold text-slate-900">
              線上預約
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              填寫以下表單，我們會在營業時間內與你聯繫確認預約。
            </p>
          </div>
          <div className="mx-auto max-w-2xl">
            <Card>
              <CardContent>
                <Form {...form}>
                  <form
                    className="grid gap-4 md:grid-cols-2"
                    onSubmit={form.handleSubmit((values) => handleSubmit(values))}
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="md:col-span-1">
                          <FormLabel>姓名</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="請輸入姓名" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem className="md:col-span-1">
                          <FormLabel>電話</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="0912-345-678" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="md:col-span-1">
                          <FormLabel>Email（選填）</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" placeholder="you@example.com" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="petType"
                      render={({ field }) => (
                        <FormItem className="md:col-span-1">
                          <FormLabel>寵物類型</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="請選擇" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="dog">狗狗</SelectItem>
                                <SelectItem value="cat">貓咪</SelectItem>
                                <SelectItem value="other">其他</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="serviceType"
                      render={({ field }) => (
                        <FormItem className="md:col-span-1">
                          <FormLabel>服務類型</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="請選擇" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="basic">基礎清潔</SelectItem>
                                <SelectItem value="style">美容造型</SelectItem>
                                <SelectItem value="care">深層保養</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="md:col-span-1">
                          <FormLabel>希望日期（選填）</FormLabel>
                          <FormControl>
                            <Input {...field} type="date" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>備註（選填）</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              rows={3}
                              placeholder="毛孩狀況或其他需求"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="md:col-span-2">
                      <Button type="submit" className="w-full" size="lg">
                        送出預約
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🐾</span>
                <span className="font-semibold text-slate-900">Fluffy Spa</span>
              </div>
              <p className="text-sm text-slate-600">
                專業寵物美容，溫柔呵護每一隻毛孩。
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">聯絡方式</h3>
              <p className="text-sm text-slate-600 space-y-1">
                <div>台北市信義區某某路 88 號 1 樓</div>
                <div>電話：02-1234-5678</div>
                <div>週二至週日 11:00–20:00</div>
              </p>
            </div>
            <div className="text-right">
              <a href="#hero" className="text-sm text-slate-600 hover:text-slate-900">
                回到頂部
              </a>
              <p className="text-xs text-slate-500 mt-4">
                © {new Date().getFullYear()} Fluffy Spa
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
