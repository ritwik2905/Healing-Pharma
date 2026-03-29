import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Building2, Hospital, ShoppingCart, Globe, Shield, Users, Award, Package } from "lucide-react"
import { getSiteSettings } from "@/lib/site-settings-actions"
import { getProducts } from "@/lib/product-actions"

export default async function Home() {
  const allProducts = await getProducts()
  const featuredProducts = allProducts.slice(0, 6)

  const settings = await getSiteSettings()
  const hero = settings?.hero || {
    title: "Quality Healthcare Solutions for Everyone",
    description:
      "Healing Doc Pharma is committed to delivering high-quality pharmaceutical products that improve lives and promote wellness across communities.",
    image: "/modern-pharmacy-healthcare-professional.jpg",
  }
  const directors = settings?.directors || []

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-accent/5 to-background py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 text-balance">{hero.title}</h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">{hero.description}</p>
              <div className="flex flex-wrap gap-4">
                <Link href="/products">
                  <Button size="lg" className="gap-2">
                    Explore Products
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/#services">
                  <Button size="lg" variant="outline">
                    Our Services
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src={hero.image || "/placeholder.svg"}
                alt="Healthcare professional"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
              Why Choose Healing Doc Pharma
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We are dedicated to excellence in pharmaceutical manufacturing and distribution
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Quality Assured</h3>
              <p className="text-muted-foreground">All products meet stringent quality standards and regulations</p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Certified Excellence</h3>
              <p className="text-muted-foreground">ISO certified manufacturing with industry recognition</p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Trusted Partner</h3>
              <p className="text-muted-foreground">Serving healthcare professionals and institutions nationwide</p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-8 h-8 text-warning" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Wide Range</h3>
              <p className="text-muted-foreground">Comprehensive product portfolio for diverse healthcare needs</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4 text-balance">Featured Products</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive range of quality pharmaceutical products
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <Card className="overflow-hidden hover:shadow-xl transition-all group h-full">
                  <div className="relative h-64 bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-48 h-48 object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                    {product.inStock && (
                      <div className="absolute top-4 right-4 bg-success text-white text-xs font-semibold px-3 py-1 rounded-full">
                        In Stock
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="gap-2">
                        <Package className="w-4 h-4 text-primary" />
                        <span className="text-xs font-semibold text-primary uppercase">{product.category}</span>
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">{product.price}</span>
                      <Button variant="ghost" size="sm" className="gap-2 group-hover:gap-3 transition-all">
                        View Details
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/products">
              <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                View All Products
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4 text-balance">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive pharmaceutical solutions tailored to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="overflow-hidden group hover:shadow-xl transition-all">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="/government-building-healthcare.jpg"
                  alt="Government Supplies"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-8">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Government Supplies</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We are an approved vendor for government healthcare programs, providing reliable pharmaceutical
                  supplies to public health institutions across the country.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Shield className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span>Tender participation and fulfillment</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Shield className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span>Timely delivery to government facilities</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Shield className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span>Compliance with all regulatory requirements</span>
                  </li>
                </ul>
              </div>
            </Card>

            <Card className="overflow-hidden group hover:shadow-xl transition-all">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="/hospital-healthcare-institution.jpg"
                  alt="Institutional Sales"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-8">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                  <Hospital className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Institutional Sales</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Partnering with hospitals, clinics, and healthcare facilities to provide bulk pharmaceutical supplies
                  with competitive pricing and consistent quality.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Shield className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span>Bulk order discounts and flexible payment terms</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Shield className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span>Dedicated account management</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Shield className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span>Regular stock availability assurance</span>
                  </li>
                </ul>
              </div>
            </Card>

            <Card className="overflow-hidden group hover:shadow-xl transition-all">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="/gem-portal-ecommerce-platform.jpg"
                  alt="GEM Registered"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-8">
                <div className="w-12 h-12 bg-success rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">GEM Registered</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Registered on the Government e-Marketplace (GeM) portal, enabling seamless procurement for government
                  departments and PSUs.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Shield className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span>Direct procurement through GeM portal</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Shield className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span>Transparent pricing and quick order processing</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Shield className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span>Verified seller with quality certifications</span>
                  </li>
                </ul>
              </div>
            </Card>

            <Card className="overflow-hidden group hover:shadow-xl transition-all">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="/pharmacy-retail-store-medicine.jpg"
                  alt="General Trade"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-8">
                <div className="w-12 h-12 bg-warning rounded-lg flex items-center justify-center mb-4">
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">General Trade</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Supplying to retail pharmacies, medical stores, and distributors with efficient logistics and
                  comprehensive product support.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Shield className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span>Wide distribution network coverage</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Shield className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span>Marketing and promotional support</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Shield className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span>Competitive margins for retail partners</span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-balance">Ready to Partner With Us?</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
            Join thousands of healthcare providers who trust Healing Doc Pharma for quality pharmaceutical solutions
          </p>
          <Link href="/products">
            <Button size="lg" variant="secondary" className="gap-2 bg-white text-primary hover:bg-white/90">
              View Our Products
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">Meet Our Leadership</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our experienced team of healthcare professionals dedicated to excellence
            </p>
          </div>

          {settings?.chairman && (
            <div className="mb-16">
              <div className="max-w-2xl mx-auto">
                <Card className="overflow-hidden hover:shadow-2xl transition-shadow">
                  <div className="relative h-96 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    {settings.chairman.image ? (
                      <img
                        src={settings.chairman.image || "/placeholder.svg"}
                        alt={settings.chairman.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-40 h-40 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-white text-6xl font-bold">{settings.chairman.initials}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-8 text-center">
                    <h3 className="text-3xl font-bold text-foreground mb-2">{settings.chairman.name}</h3>
                    <p className="text-primary font-semibold text-lg mb-4">{settings.chairman.title}</p>
                    <p className="text-muted-foreground leading-relaxed">{settings.chairman.description}</p>
                  </div>
                </Card>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {directors.map((director: any) => (
              <Card key={director.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-56 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  {director.image ? (
                    <img
                      src={director.image || "/placeholder.svg"}
                      alt={director.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className={`w-24 h-24 bg-${director.color} rounded-full flex items-center justify-center`}>
                      <span className="text-white text-3xl font-bold">{director.initials}</span>
                    </div>
                  )}
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-bold text-foreground mb-1">{director.name}</h3>
                  <p className={`text-${director.color} font-semibold text-sm mb-2`}>{director.title}</p>
                  <p className="text-muted-foreground text-xs leading-relaxed line-clamp-3">{director.description}</p>
                </div>
              </Card>
            ))}
          </div>

          <div className="bg-surface rounded-2xl p-8 lg:p-12 mt-16">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                At Healing Doc Pharma, we are committed to improving the quality of life through accessible, affordable,
                and effective pharmaceutical products. Our dedicated team works tirelessly to maintain the highest
                standards of quality and safety.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">25+</div>
                  <p className="text-sm text-muted-foreground">Years of Excellence</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent mb-2">500+</div>
                  <p className="text-sm text-muted-foreground">Healthcare Partners</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-success mb-2">10000+</div>
                  <p className="text-sm text-muted-foreground">Lives Impacted</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">H</span>
                </div>
                <span className="font-bold text-xl text-foreground">Healing Doc Pharma</span>
              </div>
              <p className="text-muted-foreground">Quality healthcare solutions for a healthier tomorrow.</p>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/products" className="text-muted-foreground hover:text-primary">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="/#services" className="text-muted-foreground hover:text-primary">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/#about" className="text-muted-foreground hover:text-primary">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Contact</h4>
              <p className="text-muted-foreground">Email: info@Healingdocpharma.com</p>
              <p className="text-muted-foreground">Phone: +91 1800-XXX-XXXX</p>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Healing Doc Pharma. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
