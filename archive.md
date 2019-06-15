---
layout: page
title: Blogs
---

<section>
      <div class="dropdown btn-group">
       <form>
          <button class="btn btn-categories btn-xs" type="submit" formaction="{{ "/archive" | prepend: site.baseurl | replace: '//', '/' }}">Years</button>
          <button class="btn btn-categories btn-xs" type="submit" formaction="{{ "/posts-by-categories/" | prepend: site.baseurl | replace: '//', '/' }}">Categories</button>
      </form>
      </div><br>
  {% if site.posts[0] %}
    {% capture currentyear %}{{ 'now' | date: "%Y" }}{% endcapture %}
    {% capture firstpostyear %}{{ site.posts[0].date | date: '%Y' }}{% endcapture %}
    {% if currentyear == firstpostyear %}
        <h3>This year's posts</h3>
    {% else %}  
        <h3>{{ firstpostyear }}</h3>
    {% endif %}

    {%for post in site.posts %}
      {% unless post.next %}
        <ul>
      {% else %}
        {% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
        {% capture nyear %}{{ post.next.date | date: '%Y' }}{% endcapture %}
        {% if year != nyear %}
          </ul>
          <h3>{{ post.date | date: '%Y' }}</h3>
          <ul>
        {% endif %}
      {% endunless %}
        <li><time>{{ post.date | date:"%d %b" }} - </time>
          <a href="{{ post.url | prepend: site.baseurl | replace: '//', '/' }}">
            {{ post.title }}
          </a>
        </li>
    {% endfor %}
    </ul>

  {% endif %}
</section>